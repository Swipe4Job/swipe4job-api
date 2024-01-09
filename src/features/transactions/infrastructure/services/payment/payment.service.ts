import { Injectable } from '@nestjs/common';
import { ethers, Signature } from 'ethers';
import * as crypto from 'crypto';
import { EnvironmentService } from '../../../../../shared/infrastructure/services/environment/environment.service';
import abi from '../../../../../../contracts/zertiair-token.abi.json';
import { WalletAddress } from '../../../../../shared/domain/WalletAddress/WalletAddress';

@Injectable()
export class PaymentService {
  private readonly adminWallet: ethers.Wallet;
  private readonly smartContract;

  constructor(private environment: EnvironmentService) {
    const provider = new ethers.JsonRpcProvider(
      'https://ethereum-sepolia.publicnode.com',
    );

    this.adminWallet = new ethers.Wallet(
      this.environment.ENV.WALLET_PRIVATE_KEY,
      provider,
    );

    this.smartContract = new ethers.Contract(
      this.environment.ENV.SMART_CONTRACT_ADDRESS,
      abi,
      this.adminWallet,
    );
  }

  public async makePayment(destination: string, amount: number) {
    const transaction: ethers.TransactionResponse =
      await this.smartContract.mint(destination, amount);
    const receipt = await transaction.wait();
    if (!receipt) {
      // Transaction cannot be done
      throw new Error('Transaction cannot complete');
    }
  }

  public async burn(amount: number) {
    const transaction: ethers.TransactionResponse =
      await this.smartContract.burn(amount);
    const receipt = await transaction.wait();
    if (!receipt) {
      // Transaction cannot be done
      throw new Error('Transaction cannot complete');
    }
  }

  public async balance(address: WalletAddress): Promise<string> {
    const response: bigint = await this.smartContract.balanceOf(address.value);
    return response.toString();
  }
}
