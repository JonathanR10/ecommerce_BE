import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from './users.entity';
import { UpdateUserDto } from './DTO/UpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAllUsersService(page: number, limit: number): Promise<Users[]> {
    return this.usersRepository.getAllUsers(page, limit);
  }

  getUserByIdService(id: string): Promise<Users> {
    return this.usersRepository.getUserById(id);
  }

  updateUserService(id: string, newUserData: UpdateUserDto): Promise<Users> {
    return this.usersRepository.updateUser(id, newUserData);
  }

  deleteUserService(id: string) {
    return this.usersRepository.deleteuser(id);
  }
}
