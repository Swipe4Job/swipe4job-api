import { Injectable } from '@nestjs/common';
import { Web3LoginRequestsRepository } from '../../../domain/Web3LoginRequest/Web3LoginRequestsRepository';
import { Web3LoginRequestCriteria } from '../../../domain/Web3LoginRequest/Web3LoginRequestCriteria';
import { Web3LoginRequest } from '../../../domain/Web3LoginRequest/Web3LoginRequest';
import { PrismaProvider } from '../../../../../shared/infrastructure/services/prisma-client/prisma-provider.service';
import { PrismaCriteriaService } from '../../../../../shared/infrastructure/services/PrismaCriteria/PrismaCriteriaService';
import { ApplicationLogger } from '../../../../../shared/infrastructure/services/application-logger/application-logger';
import { PersistenceError } from '../../../../../shared/domain/PersistenceError';
import { WalletAddress } from '../../../../../shared/domain/WalletAddress/WalletAddress';
import { SignCode } from '../../../domain/Web3LoginRequest/SignCode';
import { Web3LoginRequestNotFound } from '../../../domain/Web3LoginRequest/Web3LoginRequestNotFound';
import { ByWeb3LoginRequestId } from '../../../domain/Web3LoginRequest/ByWeb3LoginRequestId';

@Injectable()
export class PrismaWeb3LoginRequestsRepository
  implements Web3LoginRequestsRepository
{
  constructor(
    private prisma: PrismaProvider,
    private prismaCriteriaService: PrismaCriteriaService,
    private logger: ApplicationLogger,
  ) {}

  async delete(criteria: Web3LoginRequestCriteria): Promise<void> {
    const filters = this.prismaCriteriaService.convertFilters(criteria.filters);
    try {
      await this.prisma.web3_requests.deleteMany({
        where: filters,
      });
    } catch (err) {
      this.logger.error(err);
      throw new PersistenceError('Error removing web3 login request');
    }
  }

  async find(criteria: Web3LoginRequestCriteria): Promise<Web3LoginRequest[]> {
    const result = await this.search(criteria);

    if (!result) {
      throw new Web3LoginRequestNotFound();
    }

    return result;
  }

  async save(request: Web3LoginRequest): Promise<void> {
    const requests = this.search(new ByWeb3LoginRequestId(request.id));

    try {
      if (!requests) {
        await this.prisma.web3_requests.create({
          data: {
            id: request.id.value,
            wallet_address: request.walletAddress.value,
            sign_code: request.signCode.value,
          },
        });
        return;
      }

      await this.prisma.web3_requests.update({
        data: {
          wallet_address: request.walletAddress.value,
          sign_code: request.signCode.value,
        },
        where: {
          id: request.id.value,
        },
      });
    } catch (err) {
      this.logger.error(err);
      throw new PersistenceError('Error saving web3 login request');
    }
  }

  async search(
    criteria: Web3LoginRequestCriteria,
  ): Promise<Web3LoginRequest[] | undefined> {
    const filters = this.prismaCriteriaService.convertFilters(criteria.filters);
    const orders = this.prismaCriteriaService.convertOrders(criteria.orders);
    let result;
    try {
      result = await this.prisma.web3_requests.findMany({
        where: filters,
        orderBy: orders as any,
        skip: criteria.skip.value || undefined,
        take: criteria.limit.value || undefined,
      });
    } catch (err) {
      this.logger.error(err);
      throw new PersistenceError('Error getting web3 login requests');
    }

    if (result.length === 0) {
      return;
    }

    const requests: Web3LoginRequest[] = [];
    for (const entry of result) {
      const walletAddress = new WalletAddress(entry.wallet_address);
      const signCode = new SignCode(entry.sign_code);
      const request = new Web3LoginRequest({ walletAddress, signCode });
      requests.push(request);
    }

    return requests;
  }
}
