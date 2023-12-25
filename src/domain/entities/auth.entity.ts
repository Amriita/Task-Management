import { AuthDto } from '../dtos/auth.dto';

export class AuthEntity {
  constructor(
    public email: string,
    public password: string,
    public id?: string,
  ) {}

  public static fromCreateDto(createDto: AuthDto): AuthEntity {
    const { email, password } = createDto;
    return new AuthEntity(email, password);
  }

  public static fromLogineDto(loginDto: AuthDto): AuthEntity {
    const { email, password } = loginDto;
    return new AuthEntity(email, password);
  }
}
