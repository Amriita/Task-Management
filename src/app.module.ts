import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ControllerModule } from './infrastructure/controller/controller.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './infrastructure/controller/controller';
import { UseCasesProxyModule } from './use-cases/usecases-proxy.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(`mongodb+srv://Amrita:-2K6Knp64wivt.N@cluster0.jkomfyn.mongodb.net/`),
    ControllerModule,
    UseCasesProxyModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
