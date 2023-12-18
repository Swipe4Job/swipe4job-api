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
import { WalletAddress } from '../../../../shared/domain/WalletAddress/WalletAddress';
import { PhoneNumber } from '../../domain/PhoneNumber/PhoneNumber';
import { UserNotFound } from '../../domain/UserRepository/UserNotFound';
import { ByUserID } from '../../domain/UserID/ByUserID';
import { UserPassword } from '../../domain/UserPassword';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(
    private prisma: PrismaProvider,
    private prismaCriteriaService: PrismaCriteriaService,
    private logger: ApplicationLogger,
  ) {}

  async delete(criteria: UserCriteria): Promise<void> {
    const filters = this.prismaCriteriaService.convertFilters(criteria.filters);
    try {
      await this.prisma.users.delete({
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
      await this.prisma.users.create({
        data: {
          uuid: user.id.value,
          email: user.email.value,
          name: user.name.value,
          role: user.role.value,
          phone_number: user.phoneNumber.value,
          wallet_address: user.walletAddress?.value,
          password: user.password?.value,
          disabled: !user.enabled,
        },
      });
    } else {
      // Update users
      await this.prisma.users.update({
        data: {
          email: user.email.value,
          name: user.name.value,
          role: user.role.value,
          phone_number: user.phoneNumber.value,
          wallet_address: user.walletAddress?.value,
          password: user.password?.value,
          disabled: !user.enabled,
        },
        where: { uuid: user.id.value },
      });
    }
  }

  async search(criteria: UserCriteria): Promise<Array<User> | undefined> {
    const filters = this.prismaCriteriaService.convertFilters(criteria.filters);
    const orders = this.prismaCriteriaService.convertOrders(criteria.orders);
    let result;
    try {
      result = await this.prisma.users.findMany({
        where: filters,
        orderBy: orders as any,
        skip: criteria.skip.value || undefined,
        take: criteria.skip.value || undefined,
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
        id: new UserId(entry.uuid),
        email: new UserEmail(entry.email),
        name: new UserName(entry.name),
        role: UserRole.from(entry.role),
        walletAddress: entry.wallet_address
          ? new WalletAddress(entry.wallet_address)
          : undefined,
        phoneNumber: new PhoneNumber(entry.phone_number),
        password: entry.password
          ? UserPassword.from(entry.password)
          : undefined,
        enabled: !entry.disabled,
      });
    });
  }
}
