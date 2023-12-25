import { CreateTaskDto, GetTaskDto, UpdateTaskDto } from '../dtos/create.task.dto';
import { CreateTaskEntity } from '../entities/create-task.entity';

export abstract class TaskRepository {
  abstract createTask(createTaskDto: CreateTaskDto): Promise<CreateTaskEntity>;
  abstract getAllTasks(getTaskDto: GetTaskDto): Promise<CreateTaskEntity[]>;
  abstract updateTask(taskId: string, updateTaskDto: UpdateTaskDto): Promise<CreateTaskEntity>;
  abstract updateStatus(taskId: string, status: string): Promise<CreateTaskEntity>;
  abstract deleteTask(taskId:string): Promise<void>;
}
