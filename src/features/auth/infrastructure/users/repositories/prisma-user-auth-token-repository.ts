import { Injectable } from '@nestjs/common';
import { UserAuthTokensRepository } from '../../../domain/UserAuthTokensRepository';
import { UserAuthTokenCriteria } from '../../../domain/UserAuthTokenCriteria';
import { UserAuthToken } from '../../../domain/users/UserAuthToken';
import { PersistenceError } from '../../../../../shared/domain/PersistenceError';
import { PrismaProvider } from '../../../../../shared/infrastructure/services/prisma-client/prisma-provider.service';
import { PrismaCriteriaService } from '../../../../../shared/infrastructure/services/PrismaCriteria/PrismaCriteriaService';
import { ApplicationLogger } from '../../../../../shared/infrastructure/services/application-logger/application-logger';
import { UserAuthTokenNotFound } from '../../../domain/users/UserAuthTokenNotFound';
import { ByUserAuthTokenId } from '../../../domain/AuthTokenId/ByUserAuthTokenId';
import { JWTService } from '../../../domain/JWTService';
import * as Either from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import {
  FieldMapper,
  FieldMapping,
} from '../../../../../shared/domain/Criteria/FieldMapper';
import { Criteria } from '@zertifier/criteria';

const fieldMapping: FieldMapping = {
  id: 'uuid',
};

@Injectable()
export class PrismaUserAuthTokenRepository implements UserAuthTokensRepository {
  constructor(
    private prisma: PrismaProvider,
    private prismaCriteriaService: PrismaCriteriaService,
    private jwtService: JWTService,
    private logger: ApplicationLogger,
  ) {}
  async delete(criteria: UserAuthTokenCriteria): Promise<void> {
    const mappedCriteria = this.mapFields(criteria);
    const filters = this.prismaCriteriaService.convertFilters(
      mappedCriteria.filters,
    );
    try {
      await this.prisma.tokens.deleteMany({
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

    if (!tokens) {
      await this.prisma.tokens.create({
        data: {
          uuid: userAuthToken.id.value,
          wallet_address: userAuthToken.payload.data.walletAddress,
          expiration_date: userAuthToken.expirationDate,
          token: signedToken,
        },
      });
      return;
    }
    await this.prisma.tokens.update({
      data: {
        uuid: userAuthToken.id.value,
        wallet_address: userAuthToken.payload.data.walletAddress,
        expiration_date: userAuthToken.expirationDate,
        token: signedToken,
        updated_at: new Date(),
      },
      where: {
        uuid: userAuthToken.id.value,
      },
    });
  }

  async search(
    criteria: UserAuthTokenCriteria,
  ): Promise<UserAuthToken[] | undefined> {
    const mappedCriteria = this.mapFields(criteria);
    const filters = this.prismaCriteriaService.convertFilters(
      mappedCriteria.filters,
    );
    const orders = this.prismaCriteriaService.convertOrders(
      mappedCriteria.orders,
    );
    let result;
    try {
      result = await this.prisma.tokens.findMany({
        where: filters,
        orderBy: orders as any,
        skip: mappedCriteria.skip.value || undefined,
        take: mappedCriteria.limit.value || undefined,
      });
    } catch (err) {
      this.logger.error(err);
      throw new PersistenceError('Error getting user tokens from database');
    }

    if (result.length == 0) {
      return;
    }

    const tokens: UserAuthToken[] = [];
    for (const entry of result) {
      const result = await this.jwtService.verify(entry.token);
      const payload = pipe(
        result,
        Either.match(
          (err) => {
            throw err;
          },
          (payload) => payload,
        ),
      );

      tokens.push(UserAuthToken.from(payload));
    }

    return tokens;
  }

  /**
   * This is because the database now has two ids. Incremental id and uuid. This map the field id to uuid.
   * This should be removed when migration is finished
   * @param criteria
   * @private
   */
  private mapFields(criteria: UserAuthTokenCriteria): Criteria {
    return FieldMapper.mapCriteria(fieldMapping, criteria);
  }
}
