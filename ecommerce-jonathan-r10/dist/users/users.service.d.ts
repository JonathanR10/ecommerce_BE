import { UsersRepository, User } from './users.repository';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    getAllUsersService(page: number, limit: number): User[];
    getUserByIdService(id: string): string | {
        id: string;
        email: string;
        name: string;
        password: string;
        address: string;
        phone: string;
        country: string;
        city: string;
    };
    addUserService(newUser: any): any;
    updateUserService(id: string, newUserData: any): string;
    deleteUserService(id: string): string;
}
