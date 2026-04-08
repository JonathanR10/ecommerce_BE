import { UsersRepository } from './users.repository';
import { Users } from './users.entity';
import { CreateUserDto } from './DTO/CreateUser.dto';
import { UpdateUserDto } from './DTO/UpdateUser.dto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    getAllUsersService(page: number, limit: number): Promise<Users[]>;
    getUserByIdService(id: string): Promise<string | Users>;
    addUserService(newUser: CreateUserDto): Promise<string>;
    updateUserService(id: string, newUserData: UpdateUserDto): Promise<Users | string>;
    deleteUserService(id: string): Promise<string>;
}
