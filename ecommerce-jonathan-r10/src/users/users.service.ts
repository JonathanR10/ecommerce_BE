import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getAllUsersService(): string {
    return 'Todos los usuarios';
  }
}
