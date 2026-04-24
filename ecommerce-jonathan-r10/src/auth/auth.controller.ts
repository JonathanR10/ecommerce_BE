import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/DTO/LoginUser.dto';
import { CreateUserDto } from 'src/users/DTO/CreateUser.dto';
import { Users } from 'src/users/users.entity';
import { UsersInterceptor } from 'src/interceptors/users.interceptors';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth(): string {
    return this.authService.getAllAuth();
  }

  @Post('signup')
  @UseInterceptors(UsersInterceptor)
  signUp(@Body() newUserData: CreateUserDto): Promise<Users> {
    return this.authService.signUp(newUserData);
  }

  @Post('signin')
  signIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }
}
