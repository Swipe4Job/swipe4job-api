import { Injectable } from '@nestjs/common';
import { UserAuthTokensRepository } from '../../../domain/users/UserAuthTokensRepository';
import { UserAuthTokenCriteria } from '../../../domain/users/UserAuthTokenCriteria';
import { UserAuthToken } from '../../../domain/users/UserAuthToken';
import { PersistenceError } from '../../../../../shared/domain/PersistenceError';
import { PrismaProvider } from '../../../../../shared/infrastructure/services/prisma-client/prisma-provider.service';
import { PrismaCriteriaService } from '../../../../../shared/infrastructure/services/PrismaCriteria/PrismaCriteriaService';
import { ApplicationLogger } from '../../../../../shared/infrastructure/services/application-logger/application-logger';
import { UserAuthTokenNotFound } from '../../../domain/users/UserAuthTokenNotFound';
import { ByUserAuthTokenId } from '../../../domain/AuthTokenId/ByUserAuthTokenId';
import { JWTService } from '../../../domain/JWTService';

@Injectable()
export class PrismaUserAuthTokenRepository implements UserAuthTokensRepository {
  constructor(
    private prisma: PrismaProvider,
    private prismaCriteriaService: PrismaCriteriaService,
    private jwtService: JWTService,
    private logger: ApplicationLogger,
  ) {}

  async delete(criteria: UserAuthTokenCriteria): Promise<void> {
    const filters = this.prismaCriteriaService.convertFilters(criteria.filters);
    try {
      await this.prisma.token.deleteMany({
        where: filters,
      });
    } catch (err) {
      this.logger.error(err);
      throw new PersistenceError('Error removing users');
    }
  }

  async find(criteria: UserAuthTokenCriteria): Promise<UserAuthToken[]> {
    const tokens = await this.search(criteria);

    if (!tokens) {
      throw new UserAuthTokenNotFound();
    }

    return tokens;
  }

  async save(userAuthToken: UserAuthToken): Promise<void> {
    const tokens = await this.search(new ByUserAuthTokenId(userAuthToken.id));

    const signedToken = await this.jwtService.sign(userAuthToken);

    try {
      if (!tokens) {
        await this.prisma.token.create({
          data: {
            id: userAuthToken.id.value,
            expirationDate: userAuthToken.expirationDate,
            token: signedToken,
          },
        });
        return;
      }
      await this.prisma.token.update({
        data: {
          expirationDate: userAuthToken.expirationDate,
          token: signedToken,
        },
        where: {
          id: userAuthToken.id.value,
        },
      });
    } catch (err) {
      this.logger.error(err);
      throw new PersistenceError('Error saving user auth token');
    }
  }

  async search(
    criteria: UserAuthTokenCriteria,
  ): Promise<UserAuthToken[] | undefined> {
    const filters = this.prismaCriteriaService.convertFilters(criteria.filters);
    const orders = this.prismaCriteriaService.convertOrders(criteria.orders);
    let result;
    try {
      result = await this.prisma.token.findMany({
        where: filters,
        orderBy: orders as any,
        skip: criteria.skip.value || undefined,
        take: criteria.limit.value || undefined,
      });
    } catch (err) {
      this.logger.error(err);
      throw new PersistenceError('Error getting user tokens from database');
    }

    if (result.length === 0) {
      return;
    }

    const tokens: UserAuthToken[] = [];
    for (const entry of result) {
      const payload = await this.jwtService.verify(entry.token);
      tokens.push(UserAuthToken.from(payload));
    }

    return tokens;
  }
}
