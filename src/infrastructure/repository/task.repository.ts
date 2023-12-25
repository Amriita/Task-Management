import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { TaskRepository } from '../../domain/repository/task.repository';
import { TaskDocument, Task } from '../../model/task.schema';
import {
  CreateTaskDto,
  GetTaskDto,
  UpdateTaskDto,
} from '../../domain/dtos/create.task.dto';
import { CreateTaskEntity } from 'src/domain/entities/create-task.entity';

@Injectable()
export class TaskRepositoryImpl implements TaskRepository {
  constructor(
    @InjectModel(Task.name)
    public taskModel: Model<TaskDocument>,
  ) {}

  // Create a task
  async createTask(createTask: CreateTaskDto): Promise<CreateTaskEntity> {
    const createTaskDto = CreateTaskEntity.fromCreateDto(createTask);
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  // Retrieve all tasks based on filters and sorting
  async getAllTasks(getTaskDto: GetTaskDto): Promise<CreateTaskEntity[]> {
    try {
      const { filter, sort } = getTaskDto;
      const tasks = await this.taskModel.find(filter).sort(sort).exec();
      return tasks;
    } catch (error) {
      throw new Error('Failed to fetch tasks.'); // Log or handle the error as needed
    }
  }

  // Update a specific task
  async updateTask(
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<CreateTaskEntity> {
    try {
      const { title, description } = updateTaskDto;
      const updateObject: any = {};
      if (title) updateObject.title = title;
      if (description) updateObject.description = description;

      const updatedTask = await this.taskModel.findByIdAndUpdate(
        taskId,
        updateObject,
        { new: true },
      );

      if (!updatedTask) {
        throw new NotFoundException('Task not found.');
      }

      return updatedTask;
    } catch (error) {
      throw new Error('Failed to update task.'); // Log or handle the error as needed
    }
  }

  // Update status of a specific task
  async updateStatus(
    taskId: string,
    status: string,
  ): Promise<CreateTaskEntity> {
    try {
      const updatedTask = await this.taskModel.findByIdAndUpdate(
        taskId,
        { status },
        { new: true },
      );

      if (!updatedTask) {
        throw new NotFoundException('Task not found.');
      }

      return updatedTask;
    } catch (error) {
      throw new Error('Failed to update status.'); // Log or handle the error as needed
    }
  }

  // Delete a specific task
  async deleteTask(taskId: string): Promise<void> {
    try {
      const deletedTask = await this.taskModel.findByIdAndDelete(taskId);

      if (!deletedTask) {
        throw new NotFoundException('Task not found.');
      }
    } catch (error) {
      throw new Error('Failed to delete task.'); // Log or handle the error as needed
    }
  }
}
