import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    await this.validatePassword(userDto.password, user.password);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new UnauthorizedException(
        'Пользователь с таким e-mail уже существует!',
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { id: user.id, email: user.email, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validatePassword(password: string, hashPassword: string) {
    const isPasswordCorrect = await bcrypt.compare(password, hashPassword);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException(
        'Пользователя с таким email или паролем не существует',
      );
    }
  }
}
