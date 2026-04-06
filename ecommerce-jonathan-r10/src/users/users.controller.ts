/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.repository';
import { UsersInterceptor } from 'src/interceptors/users.interceptors';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  @UseInterceptors(UsersInterceptor)
  @UseGuards(AuthGuard)
  getAllUsers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): User[] {
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const validPage = isNaN(pageNum) || pageNum <= 0 ? 1 : pageNum;
    const validLimit = isNaN(limitNum) || limitNum <= 0 ? 5 : limitNum;

    return this.usersService.getAllUsersService(validPage, validLimit);
  }

  //  GET{id}
  @Get(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(UsersInterceptor)
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserByIdService(id);
  }

  //  POST
  @Post()
  @HttpCode(201)
  addUser(@Body() newUser: any) {
    if (!newUser.name) return 'Nombre es requerido';
    if (!newUser.email) return 'Email es requerido';
    return this.usersService.addUserService(newUser);
  }

  //  PUT{id}
  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() newUserData: any) {
    if (newUserData.email) return 'No se puede actualizar el email';
    return this.usersService.updateUserService(id, newUserData);
  }

  //  DELETE{id})
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUserService(id);
  }
}
