import { Injectable } from '@nestjs/common';
import { UsersRepository, User } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAllUsersService(): User[] {
    return this.usersRepository.getAllUsers();
  }
}
