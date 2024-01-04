import { Web3LoginRequestCriteria } from './Web3LoginRequestCriteria';
import {
  Field,
  Filter,
  FilterGroup,
  Filters,
  Operand,
  Operator,
  Operators,
  Orders,
} from '@zertifier/criteria';
import { WalletAddress } from '../../../../shared/domain/WalletAddress/WalletAddress';

export class ByRequestWalletAddress extends Web3LoginRequestCriteria {
  constructor(walletAddress: WalletAddress) {
    super({
      filters: new Filters([
        FilterGroup.create([
          new Filter(
            new Field('wallet_address'),
            Operator.from(Operators.EQUAL),
            new Operand(walletAddress.value),
          ),
        ]),
      ]),
      orders: Orders.EMPTY(),
    });
  }
}
