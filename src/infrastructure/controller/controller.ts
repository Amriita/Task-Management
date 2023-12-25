import {
  Body,
  Controller,
  Get,
  Query,
  Patch,
  Post,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthUseCase } from '../../use-cases/auth.usecase';
import { AuthDto } from 'src/domain/dtos/auth.dto';
import { LoginEntity } from '../../domain/entities/login.entity';
import {
  CreateTaskDto,
  UpdateTaskStatusDto,
} from '../../domain/dtos/create.task.dto';
import { CreateTaskEntity } from '../../domain/entities/create-task.entity';
import { TaskUseCase } from '../../use-cases/task.usecase';
import { UpdateTaskDto } from '../../domain/dtos/create.task.dto';
import { ApiOperation } from '@nestjs/swagger';
import { AuthEntity } from '../../domain/entities/auth.entity';
import { PasswordUpdateDto } from '../../domain/dtos/auth.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authUseCase: AuthUseCase,
    private readonly taskUseCase: TaskUseCase,
  ) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Sign Up' })
  async handleSignUp(@Body() creatAuthDto: AuthDto) {
    await this.authUseCase.signup(creatAuthDto);
  }

  @Post('/login')
  async handleLogin(@Body() loginDto: AuthDto): Promise<LoginEntity> {
    return this.authUseCase.login(loginDto);
  }

  @Get('/get-user/:email')
  async handleGetUser(@Param('email') email: string): Promise<AuthEntity> {
    const userDto = { email };
    return this.authUseCase.getUser(userDto);
  }

  @Patch('/forget-password/')
  async handleForgetPassword(
    @Body() passwordUpdateDto: PasswordUpdateDto,
  ): Promise<LoginEntity> {
    return this.authUseCase.forgetPassword(passwordUpdateDto);
  }

  @Post('/create/task')
  async handleCreateTask(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<CreateTaskEntity> {
    return this.taskUseCase.createTask(createTaskDto);
  }

  @Get('/tasks')
  async getAllTasks(
    @Query('filter') filter: any,
    @Query('sort') sort: any,
  ): Promise<CreateTaskEntity[]> {
    const taskDto = { filter, sort };
    return this.taskUseCase.getAllTask(taskDto);
  }

  @Patch('/task/:taskId')
  async updateTask(
    @Param('taskId') taskId: string,
    @Body() updateTask: UpdateTaskDto,
  ): Promise<CreateTaskEntity> {
    return this.taskUseCase.updateTask(taskId, updateTask);
  }

  @Patch('/task/:id/status')
  async updateStatus(
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @Param('id') id: string,
  ): Promise<CreateTaskEntity> {
    const { newStatus } = updateTaskStatusDto;
    return this.taskUseCase.updateStatus(id, newStatus);
  }

  @Delete('/task/:taskId')
  async deleteTask(@Param('taskId') taskId: string): Promise<void> {
    await this.taskUseCase.deleteTask(taskId);
  }
}
