import { CreateUserDto } from 'src/users/DTO/CreateUser.dto';
import { UsersRepository } from 'src/users/users.repository';
import { Users } from 'src/users/users.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: UsersRepository, jwtService: JwtService);
    getAllAuth(): string;
    signUp(newUserData: CreateUserDto): Promise<Users>;
    signIn(email: string, password: string): Promise<{
        message: string;
        logged: boolean;
        token: string;
    }>;
}
