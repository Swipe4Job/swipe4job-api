import { Injectable, OnModuleInit } from '@nestjs/common';
import { Filters, Limit, Orders } from '@zertifier/criteria';
import { PhoneNumber } from 'src/features/users/domain/PhoneNumber/PhoneNumber';
import { User } from 'src/features/users/domain/User';
import { UserEmail } from 'src/features/users/domain/UserEmail/UserEmail';
import { UserId } from 'src/features/users/domain/UserID/UserId';
import { UserLastName } from 'src/features/users/domain/UserLastName';
import { UserName } from 'src/features/users/domain/UserName';
import { UserPassword } from 'src/features/users/domain/UserPassword';
import { UserCriteria } from 'src/features/users/domain/UserRepository/UserCriteria';
import { UserRepository } from 'src/features/users/domain/UserRepository/UserRepository';
import { UserRole } from 'src/features/users/domain/UserRole';
import { ApplicationLogger } from 'src/shared/infrastructure/services/application-logger/application-logger';

@Injectable()
export class UserAdminService implements OnModuleInit {
  constructor(private userRepository: UserRepository, private logger: ApplicationLogger) {
  }
  async onModuleInit() {
    const users = await this.userRepository.search(new UserCriteria({
      filters: Filters.EMPTY(),
      orders: Orders.EMPTY(),
      limit: new Limit(1)
    }));

    if (!users) {
      const adminUser = new User({
        name: new UserName('admin'),
        lastName: new UserLastName('admin'),
        phoneNumber: new PhoneNumber('000000000'),
        email: new UserEmail('admin@exmample.com'),
        role: UserRole.ADMIN,
        password: await UserPassword.create('1234'),
        id: UserId.random()
      });

      this.logger.log("Creating user admin")
      await this.userRepository.save(adminUser)
    }
  }
}
