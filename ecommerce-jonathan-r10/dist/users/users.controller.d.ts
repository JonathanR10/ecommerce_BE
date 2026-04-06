import { UsersService } from './users.service';
import { User } from './users.repository';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(page?: string, limit?: string): User[];
    getUserById(id: string): string | {
        id: string;
        email: string;
        name: string;
        password: string;
        address: string;
        phone: string;
        country: string;
        city: string;
    };
    addUser(newUser: any): any;
    updateUser(id: string, newUserData: any): string;
    deleteUser(id: string): string;
}
