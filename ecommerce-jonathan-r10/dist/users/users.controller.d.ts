import { UsersService } from './users.service';
import { Users } from './users.entity';
import { CreateUserDto } from './DTO/CreateUser.dto';
import { UpdateUserDto } from './DTO/UpdateUser.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(page?: string, limit?: string): Promise<Users[]>;
    getUserById(id: string): Promise<string | Users>;
    addUser(newUser: CreateUserDto): Promise<string>;
    updateUser(id: string, newUserData: UpdateUserDto): Promise<Users | string>;
    deleteUser(id: string): Promise<string>;
}
