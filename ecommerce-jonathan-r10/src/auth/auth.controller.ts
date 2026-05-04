import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/DTO/LoginUser.dto';
import { CreateUserDto } from 'src/users/DTO/CreateUser.dto';
import { Users } from 'src/users/users.entity';
import { UsersInterceptor } from 'src/interceptors/users.interceptors';
import {
  ApiBody,
  ApiExcludeEndpoint,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiExcludeEndpoint()
  getAuth(): string {
    return this.authService.getAllAuth();
  }

  @Post('signup')
  @ApiOperation({ summary: 'Ruta para el registro de usuarios nuevos' })
  @ApiResponse({ status: 200, description: 'Usuario creado correctamente' })
  @ApiResponse({ status: 400, description: 'Usuario registrado previamente' })
  @ApiBody({ type: CreateUserDto })
  @UseInterceptors(UsersInterceptor)
  signUp(@Body() newUserData: CreateUserDto): Promise<Users> {
    return this.authService.signUp(newUserData);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Ruta para Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión correcto' })
  @ApiResponse({ status: 400, description: 'Error con correo / contraseña' })
  @ApiBody({ type: LoginUserDto })
  signIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }
}
