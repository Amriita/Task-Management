import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { AuthController } from './controller';
import { AuthRepositoryImpl } from '../repository/auth.respository';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from '../../model/auth.schema';
import { BcryptModule } from '../../services/bycrypt.module';
import { UseCasesProxyModule } from '../../use-cases/usecases-proxy.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UseCasesProxyModule,
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '60s' },
    }),
    RepositoryModule,
    BcryptModule,
  ],
  controllers: [AuthController],
  providers: [AuthRepositoryImpl],
})
export class ControllerModule {}
