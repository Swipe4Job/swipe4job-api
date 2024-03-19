import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { UserRepository } from '../../../domain/UserRepository/UserRepository';
import { UserCriteria } from '../../../domain/UserRepository/UserCriteria';
import { Filters } from '@zertifier/criteria/dist/Filters';
import { Orders } from '@zertifier/criteria/dist/Orders';
import { Limit } from '@zertifier/criteria';
import { User } from '../../../domain/User';
import { ApplicationLogger } from '../../../../../shared/infrastructure/services/application-logger/application-logger';

@Injectable()
export class UserAdminService implements OnModuleInit {
  constructor(
    private userRepository: UserRepository,
    private applicationLogger: ApplicationLogger,
  ) {}
  async onModuleInit(): Promise<any> {
    const result = await this.userRepository.search(
      new UserCriteria({
        filters: Filters.EMPTY(),
        orders: Orders.EMPTY(),
        limit: new Limit(1),
      }),
    );

    if (result) {
      return;
    }

    this.applicationLogger.log('Default user created');
    await this.userRepository.save(
      await User.create({
        role: 'ADMIN',
        name: 'admin',
        email: 'admin@example.com',
        lastName: 'admin',
        password: 'admin',
        phoneNumber: '000000000',
      }),
    );
  }
}
