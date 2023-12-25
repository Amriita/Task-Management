import { CreateTaskDto } from '../dtos/create.task.dto';

export class CreateTaskEntity {
  constructor(
    public title: string,
    public description: string,
    public createdAt: Date,
    public updatedAt: Date,
    public id?: string,
  ) {}

  public static fromCreateDto(createDto: CreateTaskDto): CreateTaskEntity {
    const { title, description } = createDto;
    const createdAt = new Date();
    const updatedAt = new Date();
    return new CreateTaskEntity(title, description, createdAt, updatedAt);
  }
}
