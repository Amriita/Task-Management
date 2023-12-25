import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password!: string;
}

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email!: string;
}

export class PasswordUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  newPassword!: string;
}
