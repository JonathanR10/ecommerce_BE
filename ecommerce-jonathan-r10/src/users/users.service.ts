import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from './users.entity';
import { CreateUserDto } from './DTO/CreateUser.dto';
import { UpdateUserDto } from './DTO/UpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAllUsersService(page: number, limit: number): Promise<Users[]> {
    return this.usersRepository.getAllUsers(page, limit);
  }

  getUserByIdService(id: string) {
    return this.usersRepository.getUserById(id);
  }

  addUserService(newUser: CreateUserDto) {
    return this.usersRepository.addUser(newUser);
  }

  updateUserService(
    id: string,
    newUserData: UpdateUserDto,
  ): Promise<Users | string> {
    return this.usersRepository.updateUser(id, newUserData);
  }

  deleteUserService(id: string) {
    return this.usersRepository.deleteuser(id);
  }
}
