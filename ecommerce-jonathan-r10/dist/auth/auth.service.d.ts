import { CreateUserDto } from "../users/DTO/CreateUser.dto";
import { UsersRepository } from "../users/users.repository";
import { Users } from "../users/users.entity";
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
