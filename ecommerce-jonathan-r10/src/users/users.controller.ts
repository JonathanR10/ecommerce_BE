/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersInterceptor } from 'src/interceptors/users.interceptors';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Users } from './users.entity';
import { CreateUserDto } from './DTO/CreateUser.dto';
import { UpdateUserDto } from './DTO/UpdateUser.dto';

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
  ): Promise<Users[]> {
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
  getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<Users> {
    return this.usersService.getUserByIdService(id);
  }

  //  POST
  @Post()
  @HttpCode(201)
  addUser(@Body() newUser: CreateUserDto): Promise<string> {
    return this.usersService.addUserService(newUser);
  }

  //  PUT{id}
  @Put(':id')
  @UseInterceptors(UsersInterceptor)
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() newUserData: UpdateUserDto,
  ): Promise<Users> {
    return this.usersService.updateUserService(id, newUserData);
  }

  //  DELETE{id})
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUserService(id);
  }
}
