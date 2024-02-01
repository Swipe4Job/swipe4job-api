import { UserRepository } from '../../domain/UserRepository/UserRepository';
import { UserCriteria } from '../../domain/UserRepository/UserCriteria';
import { User } from '../../domain/User';
import { PrismaProvider } from '../../../../shared/infrastructure/services/prisma-client/prisma-provider.service';
import { PrismaCriteriaService } from '../../../../shared/infrastructure/services/PrismaCriteria/PrismaCriteriaService';
import { PersistenceError } from '../../../../shared/domain/PersistenceError';
import { ApplicationLogger } from '../../../../shared/infrastructure/services/application-logger/application-logger';
import { UserId } from '../../domain/UserID/UserId';
import { UserEmail } from '../../domain/UserEmail/UserEmail';
import { UserName } from '../../domain/UserName';
import { UserRole } from '../../domain/UserRole';
import { PhoneNumber } from '../../domain/PhoneNumber/PhoneNumber';
import { UserNotFound } from '../../domain/UserRepository/UserNotFound';
import { ByUserID } from '../../domain/UserID/ByUserID';
import { UserPassword } from '../../domain/UserPassword';
import { Injectable } from '@nestjs/common';
import {
  FieldMapper,
  FieldMapping,
} from '../../../../shared/domain/Criteria/FieldMapper';
import { Criteria } from '@zertifier/criteria';
import { UserLastName } from '../../domain/UserLastName';

const fieldMapping: FieldMapping = {
  id: 'uuid',
  walletAddress: 'wallet_address',
};

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(
    private prisma: PrismaProvider,
    private prismaCriteriaService: PrismaCriteriaService,
    private logger: ApplicationLogger,
  ) {}

  async delete(criteria: UserCriteria): Promise<void> {
    const mappedCriteria = this.mapFields(criteria);
    const filters = this.prismaCriteriaService.convertFilters(
      mappedCriteria.filters,
    );
    try {
      await this.prisma.user.deleteMany({
        where: filters,
      });
    } catch (err) {
      this.logger.error(err);
      throw new PersistenceError('Error removing users');
    }
  }

  async find(criteria: UserCriteria): Promise<Array<User>> {
    const users = await this.search(criteria);

    if (!users) {
      throw new UserNotFound();
    }

    return users;
  }

  async save(user: User): Promise<void> {
    // If user is not found it will throw an error
    const users = await this.search(new ByUserID(user.id));
    if (!users) {
      // Create user
      await this.prisma.user.create({
        data: {
          id: user.id.value,
          email: user.email.value,
          name: user.name.value,
          role: user.role.value,
          lastName: user.userLastName.value,
          phoneNumber: user.phoneNumber.value,
          password: user.password?.value,
        },
      });
    } else {
      // Update users
      await this.prisma.user.update({
        data: {
          email: user.email.value,
          name: user.name.value,
          role: user.role.value,
          phoneNumber: user.phoneNumber.value,
          password: user.password?.value,
        },
        where: { id: user.id.value },
      });
    }
  }

  async search(criteria: UserCriteria): Promise<Array<User> | undefined> {
    const mappedCriteria = this.mapFields(criteria);
    const filters = this.prismaCriteriaService.convertFilters(
      mappedCriteria.filters,
    );
    const orders = this.prismaCriteriaService.convertOrders(
      mappedCriteria.orders,
    );
    let result;
    try {
      result = await this.prisma.user.findMany({
        where: filters,
        orderBy: orders as any,
        skip: mappedCriteria.skip.value || undefined,
        take: mappedCriteria.limit.value || undefined,
      });
    } catch (err) {
      this.logger.error(err);
      throw new PersistenceError('Error getting users from database');
    }

    if (result.length == 0) {
      return;
    }

    return result.map((entry) => {
      return new User({
        id: new UserId(entry.id),
        email: new UserEmail(entry.email),
        name: new UserName(entry.name),
        role: UserRole.from(entry.role),
        phoneNumber: new PhoneNumber(entry.phoneNumber),
        lastName: new UserLastName(entry.lastName),
        password: entry.password
          ? UserPassword.from(entry.password)
          : undefined,
      });
    });
  }

  private mapFields(criteria: UserCriteria): Criteria {
    return FieldMapper.mapCriteria(fieldMapping, criteria);
  }
}
