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
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtiene el listado de todos los usuarios' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: String,
    description: 'Numero de pagina para el paginado',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: String,
    description: 'Numero de usuarios por pagina',
  })
  @ApiResponse({ status: 401, description: 'Sesión invalida' })
  @ApiResponse({
    status: 403,
    description: 'Permisos insuficientes para acceder a la ruta',
  })
  @ApiResponse({
    status: 200,
    description: 'Acceso al listado de usuarios correctamente',
  })
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
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Obtiene la información del usuario correspondiente al id proporcionado',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 401, description: 'Sesión invalida' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @UseGuards(AuthGuard)
  @UseInterceptors(UsersInterceptor)
  getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<Users> {
    return this.usersService.getUserByIdService(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualiza la información del usuario correspondiente al id',
  })
  @ApiParam({
    name: 'id',
    description: 'Id del usuario que se desea actualizar',
    type: 'string',
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado correctamente',
  })
  @ApiResponse({ status: 401, description: 'Sesión invalida' })
  @ApiResponse({
    status: 404,
    description:
      'Usuario no encontrado o los parametros a actualizar no cumplen con los requisitos',
  })
  @UseInterceptors(UsersInterceptor)
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() newUserData: UpdateUserDto,
  ): Promise<Users> {
    return this.usersService.updateUserService(id, newUserData);
  }

  //#region API Documentation
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Elimina al usuario correspondiente al id proporcionado',
  })
  @ApiParam({
    name: 'id',
    description: 'Id del usuario que se desea borrar',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario borrado correctamente',
  })
  @ApiResponse({ status: 401, description: 'Sesión invalida' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  //#endregion
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUserService(id);
  }

  @ApiExcludeEndpoint()
  @Get('seeder')
  addProducts() {
    return this.usersService.addAllUsers();
  }
}
