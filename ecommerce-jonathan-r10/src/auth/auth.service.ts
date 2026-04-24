import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/DTO/CreateUser.dto';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/common/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  getAllAuth(): string {
    return 'Autenticación correcta';
  }

  async signUp(newUserData: CreateUserDto): Promise<Users> {
    const { email, password } = newUserData;

    const foundUser = await this.userRepository.getUserByEmail(email);
    if (foundUser)
      throw new BadRequestException(
        `El email = ${email} ya se encuentra registrado`,
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.userRepository.addUser({
      ...newUserData,
      password: hashedPassword,
    });
  }

  async signIn(email: string, password: string) {
    const foundUser = await this.userRepository.getUserByEmail(email);
    if (!foundUser)
      throw new BadRequestException('Usuario o password son incorrectos');

    const isValid = await bcrypt.compare(password, foundUser.password);
    if (!isValid)
      throw new BadRequestException('Usuario o password son incorrectos');

    const payload = {
      id: foundUser.id,
      roles: foundUser.isAdmin ? [Role.Admin] : [Role.User],
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Usuario loggeado',
      logged: true,
      token,
    };
  }
}
