import { Global, Module } from '@nestjs/common';
import { BcryptService } from './bycrypt.service';
import { JwtService } from './jwt.service';

@Global()
@Module({
  providers: [BcryptService, JwtService],
  exports: [BcryptService, JwtService],
})
export class BcryptModule {}