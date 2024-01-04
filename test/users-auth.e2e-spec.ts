import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/core/app.module';
import { ethers } from 'ethers';
import request from 'supertest';
import { Web3LoginRequestsRepository } from '../src/features/auth/domain/Web3LoginRequest/Web3LoginRequestsRepository';
import { Web3LoginRequestCriteria } from '../src/features/auth/domain/Web3LoginRequest/Web3LoginRequestCriteria';
import { Web3LoginRequest } from '../src/features/auth/domain/Web3LoginRequest/Web3LoginRequest';
import { TransformInterceptor } from '../src/core/transform/transform.interceptor';
import { Web3LoginRequestNotFound } from '../src/features/auth/domain/Web3LoginRequest/Web3LoginRequestNotFound';
import { UserRepository } from '../src/features/users/domain/UserRepository/UserRepository';
import { User } from '../src/features/users/domain/User';
import { UserCriteria } from '../src/features/users/domain/UserRepository/UserCriteria';
import { UserId } from '../src/features/users/domain/UserID/UserId';
import { UserRole } from '../src/features/users/domain/UserRole';
import { WalletAddress } from '../src/shared/domain/WalletAddress/WalletAddress';
import { UserPassword } from '../src/features/users/domain/UserPassword';
import { PhoneNumber } from '../src/features/users/domain/PhoneNumber/PhoneNumber';
import { UserEmail } from '../src/features/users/domain/UserEmail/UserEmail';
import { UserName } from '../src/features/users/domain/UserName';
import { JWTService } from '../src/features/auth/domain/JWTService';

describe('UserAuthController (e2e)', () => {
  const wallet = ethers.Wallet.createRandom();
  let app: INestApplication;
  let requests: Web3LoginRequest[] = [];
  const web3LoginRequestRepository: Web3LoginRequestsRepository = {
    async search(
      criteria: Web3LoginRequestCriteria,
    ): Promise<Web3LoginRequest[] | undefined> {
      return requests.length === 0 ? undefined : requests;
    },
    async delete(criteria: Web3LoginRequestCriteria): Promise<void> {
      return Promise.resolve(undefined);
    },
    async find(
      criteria: Web3LoginRequestCriteria,
    ): Promise<Web3LoginRequest[]> {
      const result = this.search(criteria);
      if (!result) {
        throw new Web3LoginRequestNotFound();
      }

      return result;
    },
    async save(request: Web3LoginRequest): Promise<void> {
      const index = requests.findIndex((req) => req.id.equals(request.id));
      if (index === -1) {
        requests.push(request);
      } else {
        requests[index] = request;
      }
    },
  };

  let users: User[] = [];
  const userRepository: UserRepository = {
    delete(criteria: UserCriteria): Promise<void> {
      return Promise.resolve(undefined);
    },
    async find(criteria: UserCriteria): Promise<Array<User>> {
      return users;
    },
    save(user: User): Promise<void> {
      return Promise.resolve(undefined);
    },
    search(criteria: UserCriteria): Promise<Array<User> | undefined> {
      return Promise.resolve(undefined);
    },
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(Web3LoginRequestsRepository)
      .useValue(web3LoginRequestRepository)
      .overrideProvider(UserRepository)
      .useValue(userRepository)
      .compile();

    users = [
      new User({
        id: UserId.random(),
        role: UserRole.ADMIN,
        walletAddress: new WalletAddress(wallet.address),
        password: await UserPassword.create('1234'),
        phoneNumber: new PhoneNumber('1234'),
        email: new UserEmail('example@email.com'),
        name: new UserName('a simple name'),
      }),
    ];
    requests = [];

    app = moduleRef.createNestApplication();
    app.useGlobalInterceptors(new TransformInterceptor());
    await app.init();
  });

  it('/auth/users/sign-code (POST)', async () => {
    const result = await request(app.getHttpServer())
      .post('/auth/users/sign-code')
      .send({ walletAddress: wallet.address })
      .expect(201);

    const { signCode } = result.body.data;
    expect(typeof signCode).toBe('string');
  });

  it('should log in', async () => {
    let result = await request(app.getHttpServer())
      .post('/auth/users/sign-code')
      .send({ walletAddress: wallet.address })
      .expect(201);

    const { signCode } = result.body.data;
    expect(typeof signCode).toBe('string');

    const signature = await wallet.signMessage(signCode);
    result = await request(app.getHttpServer())
      .post('/auth/users/w3-login')
      .send({ walletAddress: wallet.address, signature })
      .expect(201);

    const jwtService = app.get(JWTService);
    const { accessToken, refreshToken } = result.body.data;

    expect(() => jwtService.verify(accessToken)).not.toThrow();
    expect(() => jwtService.verify(refreshToken)).not.toThrow();
  });
});
