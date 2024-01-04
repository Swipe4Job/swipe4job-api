import { Injectable } from '@nestjs/common';
import { Web3LoginRequestsRepository } from '../../domain/Web3LoginRequest/Web3LoginRequestsRepository';
import { Web3LoginRequest } from '../../domain/Web3LoginRequest/Web3LoginRequest';
import { WalletAddress } from '../../../../shared/domain/WalletAddress/WalletAddress';
import { SignCode } from '../../domain/Web3LoginRequest/SignCode';

@Injectable()
export class UserGetSignCode {
  constructor(
    private web3LoginRequestRepository: Web3LoginRequestsRepository,
  ) {}

  public async run(walletAddress: string) {
    const request = new Web3LoginRequest({
      walletAddress: new WalletAddress(walletAddress),
      signCode: SignCode.random(),
    });
    await this.web3LoginRequestRepository.save(request);
    // TODO emit event new request
    return request;
  }
}
