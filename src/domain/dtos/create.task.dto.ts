import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class GetTaskDto {
  @ApiProperty()
  filter?: any;

  @ApiProperty()
  sort?: any;
}

export class UpdateTaskDto {
  @ApiProperty()
  title?: string;
  @ApiProperty()
  description?: string;
}

export class UpdateTaskStatusDto {
  @ApiProperty()
  newStatus: string;
}
