import { UsersRepository } from './users.repository';
import { Users } from './users.entity';
import { UpdateUserDto } from './DTO/UpdateUser.dto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    getAllUsersService(page: number, limit: number): Promise<Users[]>;
    getUserByIdService(id: string): Promise<Users>;
    updateUserService(id: string, newUserData: UpdateUserDto): Promise<Users>;
    deleteUserService(id: string): Promise<string>;
    addAllUsers(): Promise<string>;
}
