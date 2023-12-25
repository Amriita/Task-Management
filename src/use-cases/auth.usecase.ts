import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/domain/dtos/auth.dto';
import { AuthEntity } from 'src/domain/entities/auth.entity';
import { AuthRepository } from 'src/domain/repository/auth.repository';
import { UserDto, PasswordUpdateDto } from '../domain/dtos/auth.dto';
import { LoginEntity } from '../domain/entities/login.entity';

@Injectable()
export class AuthUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async signup(createAuthDto: AuthDto): Promise<void> {
    const newAuthEntity = AuthEntity.fromCreateDto(createAuthDto);
    return this.authRepository.signup(newAuthEntity);
  }

  async login(loginDto: AuthDto) {
    const newAuthEntity = AuthEntity.fromCreateDto(loginDto);
    return this.authRepository.login(newAuthEntity);
  }

  async getUser(userDto: UserDto): Promise<AuthEntity> {
    return this.authRepository.getUser(userDto);
  }

  async forgetPassword(
    passwordUpdateDto: PasswordUpdateDto,
  ): Promise<LoginEntity> {
    return this.authRepository.forgetPassword(passwordUpdateDto);
  }
}
