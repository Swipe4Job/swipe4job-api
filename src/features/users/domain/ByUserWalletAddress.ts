import { UserCriteria } from './UserRepository/UserCriteria';
import { WalletAddress } from '../../../shared/domain/WalletAddress/WalletAddress';
import {
  Filter,
  FilterGroup,
  Filters,
  Operators,
  Orders,
} from '@zertifier/criteria';

export class ByUserWalletAddress extends UserCriteria {
  constructor(walletAddress: WalletAddress) {
    super({
      filters: new Filters([
        FilterGroup.create([
          Filter.create('wallet_address', Operators.EQUAL, walletAddress.value),
        ]),
      ]),
      orders: Orders.EMPTY(),
    });
  }
}
