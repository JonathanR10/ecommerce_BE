import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/DTO/LoginUser.dto';
import { CreateUserDto } from 'src/users/DTO/CreateUser.dto';
import { Users } from 'src/users/users.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAuth(): string;
    signUp(newUserData: CreateUserDto): Promise<Users>;
    signIn(credentials: LoginUserDto): Promise<{
        message: string;
        logged: boolean;
        token: string;
    }>;
}
