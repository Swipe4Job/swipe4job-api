import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as crypto from 'crypto';

@Injectable()
export class PaymentService {
  public async makePayment(
    walletAddress: string,
    amount: number,
  ): Promise<string> {
    const buffer = crypto.randomBytes(20);
    return ethers.id(buffer.toString());
  }
}
