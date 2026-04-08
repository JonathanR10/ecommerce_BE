import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/DTO/LoginUser.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAuth(): string;
    signIn(credentials: LoginUserDto): Promise<"Email y passwors son requeridos" | "Email o password incorrecto" | "Usuario loggeado">;
}
