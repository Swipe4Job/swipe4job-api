import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/core/app.module';
import { ethers } from 'ethers';
import request from 'supertest';
import { Web3LoginRequestsRepository } from '../src/features/auth/domain/Web3LoginRequest/Web3LoginRequestsRepository';
import { Web3LoginRequestCriteria } from '../src/features/auth/domain/Web3LoginRequest/Web3LoginRequestCriteria';
import { Web3LoginRequest } from '../src/features/auth/domain/Web3LoginRequest/Web3LoginRequest';
import { TransformInterceptor } from '../src/core/transform/transform.interceptor';

describe('UserAuthController (e2e)', () => {
  let app: INestApplication;
  const web3LoginRequestRepository: Web3LoginRequestsRepository = {
    search(
      criteria: Web3LoginRequestCriteria,
    ): Promise<Web3LoginRequest[] | undefined> {
      return Promise.resolve(undefined);
    },
    delete(criteria: Web3LoginRequestCriteria): Promise<void> {
      return Promise.resolve(undefined);
    },
    find(criteria: Web3LoginRequestCriteria): Promise<Web3LoginRequest[]> {
      return Promise.resolve([]);
    },
    save(request: Web3LoginRequest): Promise<void> {
      return Promise.resolve(undefined);
    },
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(Web3LoginRequestsRepository)
      .useValue(web3LoginRequestRepository)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalInterceptors(new TransformInterceptor());
    await app.init();
  });

  it('/auth/users/sign-code (POST)', () => {
    const wallet = ethers.Wallet.createRandom();
    return request(app.getHttpServer())
      .post('/auth/users/sign-code')
      .send({ walletAddress: wallet.address })
      .expect(201)
      .then((result) => {
        expect(typeof result.body.data.signCode).toBe('string');
      });
  });
});
