import { Module } from '@nestjs/common';
import { JWTService } from '../domain/JWTService';

@Module({
  providers: [JWTService],
})
export class AuthModule {}
