import { Injectable } from '@nestjs/common';
import { verifyMessage } from 'ethers';
import { Web3LoginRequestsRepository } from '../../domain/Web3LoginRequest/Web3LoginRequestsRepository';
import { ByRequestWalletAddress } from '../../domain/Web3LoginRequest/ByRequestWalletAddress';
import { WalletAddress } from '../../../../shared/domain/WalletAddress/WalletAddress';
import { UserContextService } from '../../../users/domain/UserContextService';
import { UserCriteria } from '../../../users/domain/UserRepository/UserCriteria';
import { Filters, Operators } from '@zertifier/criteria/dist/Filters';
import { Filter, FilterGroup } from '@zertifier/criteria';
import { Orders } from '@zertifier/criteria/dist/Orders';
import { UserAuthSessionService } from './UserAuthSessionService';
import { NoMatchingWeb3LoginRequestFound } from '../../domain/Web3LoginRequest/NoMatchingWeb3LoginRequestFound';

@Injectable()
export class UserWeb3Login {
  constructor(
    private web3LoginRequestRepository: Web3LoginRequestsRepository,
    private userContextService: UserContextService,
    private userAuthSessionService: UserAuthSessionService,
  ) {}

  public async run(_walletAddress: string, _signature: string) {
    const walletAddress = new WalletAddress(_walletAddress);
    const requests = await this.web3LoginRequestRepository.find(
      new ByRequestWalletAddress(walletAddress),
    );

    const matchingRequest = requests.find(
      (request) =>
        _walletAddress === verifyMessage(request.signCode.value, _signature),
    );

    if (!matchingRequest) {
      throw new NoMatchingWeb3LoginRequestFound();
    }

    const users = await this.userContextService.findUsers(
      new UserCriteria({
        filters: Filters.create([
          FilterGroup.create([
            Filter.create('wallet_address', Operators.EQUAL, _walletAddress),
            Filter.create('disabled', Operators.EQUAL, false),
          ]),
        ]),
        orders: Orders.EMPTY(),
      }),
    );

    const user = users[0];
    return await this.userAuthSessionService.createSession(user);
  }
}
