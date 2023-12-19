import { Injectable } from '@nestjs/common';
import { UserAuthTokensRepository } from '../../../domain/UserAuthTokensRepository';
import { UserAuthTokenCriteria } from '../../../domain/UserAuthTokenCriteria';
import { UserAuthToken } from '../../../domain/users/UserAuthToken';
import { PersistenceError } from '../../../../../shared/domain/PersistenceError';
import { PrismaProvider } from '../../../../../shared/infrastructure/services/prisma-client/prisma-provider.service';
import { PrismaCriteriaService } from '../../../../../shared/infrastructure/services/PrismaCriteria/PrismaCriteriaService';
import { ApplicationLogger } from '../../../../../shared/infrastructure/services/application-logger/application-logger';
import { AuthTokenId } from '../../../domain/AuthTokenId/AuthTokenId';
import { UserAuthTokenNotFound } from '../../../domain/users/UserAuthTokenNotFound';
import { Field, Filter, FilterGroup, Order } from '@zertifier/criteria';
import { Filters } from '@zertifier/criteria/dist/Filters';
import { Orders } from '@zertifier/criteria/dist/Orders';
import { ByUserAuthTokenId } from '../../../domain/AuthTokenId/ByUserAuthTokenId';
import { JWTService } from '../../../domain/JWTService';
import * as Either from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

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
      await this.prisma.users.delete({
        where: filters,
      });
    } catch (err) {
      this.logger.error(err);
      throw new PersistenceError('Error removing users');
    }
  }

  async find(criteria: UserAuthTokenCriteria): Promise<UserAuthToken[]> {
    const mappedCriteria = this.mapFields(criteria);
    const tokens = await this.search(mappedCriteria);

    if (!tokens) {
      throw new UserAuthTokenNotFound();
    }

    return tokens;
  }

  async save(userAuthToken: UserAuthToken): Promise<void> {
    const tokens = this.search(
      this.mapFields(new ByUserAuthTokenId(userAuthToken.id)),
    );

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
      const result = await this.jwtService.decode(entry.token);
      const payload = pipe(
        result,
        Either.match(
          (err) => {
            throw err;
          },
          (payload) => payload,
        ),
      );

      tokens.push(
        UserAuthToken.from(payload).withId(new AuthTokenId(entry.uuid)),
      );
    }

    return tokens;
  }

  /**
   * This is because the database now has two ids. Incremental id and uuid. This map the field id to uuid.
   * This should be removed when migration is finished
   * @param criteria
   * @private
   */
  private mapFields(criteria: UserAuthTokenCriteria): UserAuthTokenCriteria {
    const { filters, orders } = criteria;
    const groups = filters.groups.map((group) => {
      const filters = group.filters.map((filter) => {
        if (filter.field.value === 'id') {
          return new Filter(new Field('uuid'), filter.operator, filter.operand);
        }
        return filter;
      });
      return filters.length ? FilterGroup.create(filters) : FilterGroup.EMPTY();
    });
    const newFilters = groups.length ? new Filters(groups) : Filters.EMPTY();

    const mappedOrders = orders.orders.map((order) => {
      if (order.field.value === 'id') {
        return new Order(new Field('uuid'), order.direction);
      }
      return order;
    });

    const newOrders = mappedOrders.length
      ? Orders.create(mappedOrders)
      : Orders.EMPTY();

    return new UserAuthTokenCriteria({
      filters: newFilters,
      orders: newOrders,
      skip: criteria.skip,
      limit: criteria.limit,
    });
  }
}
