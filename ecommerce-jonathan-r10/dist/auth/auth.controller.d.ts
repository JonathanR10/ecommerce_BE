import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAuth(): string;
    signIn(credentials: any): "Email y passwors son requeridos" | "Email o password incorrecto" | "Usuario loggeado";
}
