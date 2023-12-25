import { AuthDto, PasswordUpdateDto, UserDto } from 'src/domain/dtos/auth.dto';
import { AuthRepository } from 'src/domain/repository/auth.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from 'src/model/auth.schema';
import { BcryptService } from 'src/services/bycrypt.service';
import { JwtService } from '../../services/jwt.service';
import { LoginEntity } from '../../domain/entities/login.entity';
import { AuthEntity } from 'src/domain/entities/auth.entity';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    @InjectModel(Auth.name)
    public authModel: Model<AuthDocument>,
    private bcryptService: BcryptService,
    private jwtService: JwtService,
  ) {}

  // Sign-up method
  async signup(createAuthDto: AuthDto): Promise<void> {
    const { email, password } = createAuthDto;
    const bcryptPassword = await this.bcryptService.hashingPassword(password);

    // Create user
    await this.authModel.create({ email, password: bcryptPassword });
  }

  // Login method
  async login(loginUserDto: AuthDto): Promise<LoginEntity> {
    try {
      await this.#validateUser(loginUserDto);
      const payload = { email: loginUserDto.email };
      return {
        token: this.jwtService.generateToken(payload),
        statusCode: 200,
      };
    } catch (error) {
      // Centralize error handling with specific exceptions
      if (error.statusCode === 404) {
        throw new NotFoundException(error.message); // User not found
      } else if (error.statusCode === 401) {
        throw new UnauthorizedException(error.message); // Incorrect password
      }
      throw error;
    }
  }

  // Get user method
  async getUser(userDto: UserDto): Promise<AuthEntity> {
    const { email } = userDto;
    const user = await this.authModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Password update method
  async forgetPassword(passwordupdate: PasswordUpdateDto): Promise<LoginEntity> {
    try {
      const { email, newPassword } = passwordupdate;
      await this.authModel.findOneAndUpdate(
        { email },
        { password: newPassword },
        { new: true },
      );
      const payload = { email };
      return {
        token: this.jwtService.generateToken(payload),
        statusCode: 200,
      };
    } catch (error) {
      // Centralized error handling
      if (error instanceof Error) {
        throw new Error(error.message); // Any other unexpected error
      }
      throw error;
    }
  }

  // Private method to validate user during login
  async #validateUser(loginUserDto: AuthDto) {
    const { email } = loginUserDto;
    const user = await this.authModel.findOne({ email });
    if (!user) {
      throw { message: 'User not found', statusCode: 404 };
    }

    const passwordMatch = await this.bcryptService.comparePassword(
      loginUserDto.password,
      user.password,
    );
    if (passwordMatch) {
      return { message: 'Authentication successful', statusCode: 200 };
    } else {
      throw { message: 'Incorrect password', statusCode: 401 };
    }
  }
}
