import { UsersService } from './users.service';
import { User } from './users.repository';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(): User[];
}
