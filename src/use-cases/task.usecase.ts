import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/domain/dtos/auth.dto';
import { AuthEntity } from 'src/domain/entities/auth.entity';
import { AuthRepository } from 'src/domain/repository/auth.repository';
import { TaskRepository } from '../domain/repository/task.repository';
import { CreateTaskEntity } from '../domain/entities/create-task.entity';
import { CreateTaskDto, GetTaskDto, UpdateTaskDto } from '../domain/dtos/create.task.dto';

@Injectable()
export class TaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<CreateTaskEntity> {
    const newAuthEntity = CreateTaskEntity.fromCreateDto(createTaskDto);
    return this.taskRepository.createTask(newAuthEntity);
  }

  async getAllTask(getTaskDto: GetTaskDto): Promise<CreateTaskEntity[]> {
    return this.taskRepository.getAllTasks(getTaskDto);
  }

  async updateTask(
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<CreateTaskEntity> {
    return this.taskRepository.updateTask(taskId, updateTaskDto);
  }

  async updateStatus(taskId: string, status: string): Promise<CreateTaskEntity>{
    return this.taskRepository.updateStatus(taskId, status);
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.taskRepository.deleteTask(taskId);
  }
}
