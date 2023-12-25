import { Module } from '@nestjs/common';
import { RepositoryModule } from '../infrastructure/repository/repository.module';
import { AuthUseCase } from './auth.usecase';
import { TaskUseCase } from './task.usecase';

@Module({
  imports: [RepositoryModule],
  providers: [AuthUseCase, TaskUseCase],
  exports: [AuthUseCase, TaskUseCase],
})
export class UseCasesProxyModule {}
