import { Injectable } from '@nestjs/common';
import { UsersRepository, User } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAllUsersService(page: number, limit: number): User[] {
    return this.usersRepository.getAllUsers(page, limit);
  }

  getUserByIdService(id: string) {
    return this.usersRepository.getUserById(id);
  }

  addUserService(newUser) {
    return this.usersRepository.addUser(newUser);
  }

  updateUserService(id: string, newUserData: any) {
    return this.usersRepository.updateUser(id, newUserData);
  }

  deleteUserService(id: string) {
    return this.usersRepository.deleteuser(id);
  }
}
