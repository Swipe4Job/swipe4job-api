import { TransactionDate } from './TransactionDate';
import { TransactionID } from './TransactionID';
import { Serializer } from '../../../shared/domain/Serializer';
import { WalletAddress } from '../../../shared/domain/WalletAddress/WalletAddress';
import { TransactionState } from './TransactionState';

export class Transaction implements Serializer {
  constructor(destinationWallet: WalletAddress, tokens: number) {
    this._destinationWallet = destinationWallet;
    this._tokens = tokens;
    this._id = TransactionID.random();
    this._date = TransactionDate.now();
    this._state = TransactionState.PENDING();
  }

  private _state: TransactionState;

  get state(): TransactionState {
    return this._state;
  }

  private _id: TransactionID;

  get id(): TransactionID {
    return this._id;
  }

  private _destinationWallet: WalletAddress;

  get destinationWallet(): WalletAddress {
    return this._destinationWallet;
  }

  private _tokens: number; // Tokens

  get tokens(): number {
    return this._tokens;
  }

  withTokens(tokens: number): Transaction {
    this._tokens = tokens;
    return this;
  }

  private _date: TransactionDate;

  get date(): TransactionDate {
    return this._date;
  }

  withState(state: TransactionState): Transaction {
    this._state = state;
    return this;
  }

  withId(id: TransactionID): Transaction {
    this._id = id;
    return this;
  }

  withDate(date: TransactionDate): Transaction {
    this._date = date;
    return this;
  }

  withDestinationWallet(wallet: WalletAddress): Transaction {
    this._destinationWallet = wallet;
    return this;
  }

  serialize() {
    return {
      id: this.id.value,
      date: this.date.utc().format('YYYY-MM-DD HH:mm:ss'),
      destinationWallet: this.destinationWallet.value,
      tokens: this.tokens,
      state: this.state.value,
    };
  }
}
