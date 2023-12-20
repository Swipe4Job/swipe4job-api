import { JWTService } from '../domain/JWTService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VerifyAuthToken {
  constructor(private jwtService: JWTService) {}
  public async run(jwt: string) {
    return await this.jwtService.verify(jwt);
  }
}
