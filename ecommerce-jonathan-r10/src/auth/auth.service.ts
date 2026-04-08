import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UsersRepository) {}

  getAllAuth(): string {
    return 'Autenticación correcta';
  }

  async signIn(email: string, password: string) {
    if (!email || !password) return 'Email y passwors son requeridos';

    const foundUser = await this.userRepository.getUserByEmail(email);
    if (!foundUser) return 'Email o password incorrecto';

    if (foundUser.password !== password) return 'Email o password incorrecto';

    return 'Usuario loggeado';
  }
}
