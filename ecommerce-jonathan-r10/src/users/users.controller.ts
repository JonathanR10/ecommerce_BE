import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersInterceptor } from 'src/interceptors/users.interceptors';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Users } from './users.entity';
import { UpdateUserDto } from './DTO/UpdateUser.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/common/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  @UseInterceptors(UsersInterceptor)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
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

  @Get(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(UsersInterceptor)
  getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<Users> {
    return this.usersService.getUserByIdService(id);
  }

  @Put(':id')
  @UseInterceptors(UsersInterceptor)
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() newUserData: UpdateUserDto,
  ): Promise<Users> {
    return this.usersService.updateUserService(id, newUserData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUserService(id);
  }
}
