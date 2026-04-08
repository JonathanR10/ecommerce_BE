import { UsersRepository } from 'src/users/users.repository';
export declare class AuthService {
    private readonly userRepository;
    constructor(userRepository: UsersRepository);
    getAllAuth(): string;
    signIn(email: string, password: string): Promise<"Email y passwors son requeridos" | "Email o password incorrecto" | "Usuario loggeado">;
}
