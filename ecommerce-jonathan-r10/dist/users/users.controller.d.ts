import { UsersService } from './users.service';
import { Users } from './users.entity';
import { UpdateUserDto } from './DTO/UpdateUser.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(page?: string, limit?: string): Promise<Users[]>;
    getUserById(id: string): Promise<Users>;
    updateUser(id: string, newUserData: UpdateUserDto): Promise<Users>;
    deleteUser(id: string): Promise<string>;
    addProducts(): Promise<string>;
}
