import { AuthDto, UserDto, PasswordUpdateDto } from '../dtos/auth.dto';
import { LoginEntity } from '../entities/login.entity';
import { AuthEntity } from '../entities/auth.entity';

export abstract class AuthRepository {
  abstract signup(createAuthDto: AuthDto): Promise<void>;
  abstract login(createAuthDto: AuthDto): Promise<LoginEntity>;
  abstract getUser(userDto: UserDto): Promise<AuthEntity>;
  abstract forgetPassword(
    passwordupdate: PasswordUpdateDto,
  ): Promise<LoginEntity>;
}
