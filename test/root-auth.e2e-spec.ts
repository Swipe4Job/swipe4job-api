import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/core/app.module';
import { User } from '../src/features/users/domain/User';
import { UserId } from '../src/features/users/domain/UserID/UserId';
import { UserRole } from '../src/features/users/domain/UserRole';
import { WalletAddress } from '../src/shared/domain/WalletAddress/WalletAddress';
import { UserPassword } from '../src/features/users/domain/UserPassword';
import { PhoneNumber } from '../src/features/users/domain/PhoneNumber/PhoneNumber';
import { UserEmail } from '../src/features/users/domain/UserEmail/UserEmail';
import { UserName } from '../src/features/users/domain/UserName';
import { ethers } from 'ethers';
import { TransformInterceptor } from '../src/core/transform/transform.interceptor';
import { JWTService } from '../src/features/auth/domain/JWTService';
import { ApiAuthToken } from '../src/features/auth/domain/ApiAuthToken';
import { UserAuthToken } from '../src/features/auth/domain/users/UserAuthToken';

describe('RootAuthController', () => {
  const wallet = ethers.Wallet.createRandom();
  let app: INestApplication;
  let jwtService: JWTService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalInterceptors(new TransformInterceptor());
    jwtService = app.get(JWTService);
    await app.init();
  });

  it('should verify user auth tokens', async () => {
    const user = new User({
      id: UserId.random(),
      role: UserRole.ADMIN,
      walletAddress: new WalletAddress(wallet.address),
      password: await UserPassword.create('1234'),
      phoneNumber: new PhoneNumber('1234'),
      email: new UserEmail('example@email.com'),
      name: new UserName('a simple name'),
    });

    const accessToken = UserAuthToken.createAccessToken({
      walletAddress: user.walletAddress!.value,
      role: user.role.value,
      userID: user.id.value,
    });

    const signedAccessToken = await jwtService.sign(accessToken);

    // Getting user auth token
    return request(app.getHttpServer())
      .post('/auth/verify')
      .send({ jwt: signedAccessToken })
      .expect(201);
  });

  it('shoul verify api auth tokens', async () => {
    const apiAuthToken = new ApiAuthToken({ name: 'simple api integration' });
    const signedToken = await jwtService.sign(apiAuthToken);
    return request(app.getHttpServer())
      .post('/auth/verify')
      .send({ jwt: signedToken })
      .expect(201);
  });
});
