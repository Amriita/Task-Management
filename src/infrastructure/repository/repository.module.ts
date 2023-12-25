import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthRepositoryImpl } from './auth.respository';
import { Auth, AuthSchema } from '../../model/auth.schema';
import { AuthRepository } from '../../domain/repository/auth.repository';
import { BcryptModule } from '../../services/bycrypt.module';
import { TaskRepository } from '../../domain/repository/task.repository';
import { TaskRepositoryImpl } from './task.repository';
import { Task, TaskSchema } from '../../model/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    BcryptModule,
  ],
  providers: [
    AuthRepositoryImpl,
    TaskRepositoryImpl,
    { provide: AuthRepository, useClass: AuthRepositoryImpl },
    { provide: TaskRepository, useClass: TaskRepositoryImpl },
  ],
  exports: [AuthRepository, TaskRepository],
})
export class RepositoryModule {}
