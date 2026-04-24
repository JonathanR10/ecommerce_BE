import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './DTO/CreateUser.dto';
import { UpdateUserDto } from './DTO/UpdateUser.dto';
export declare class UsersRepository {
    private readonly ormUsersRepository;
    constructor(ormUsersRepository: Repository<Users>);
    getAllUsers(page: number, limit: number): Promise<Users[]>;
    getUserById(id: string): Promise<Users>;
    getUserByEmail(email: string): Promise<Users | null>;
    addUser(newUser: CreateUserDto): Promise<Users>;
    updateUser(id: string, userNewData: UpdateUserDto): Promise<Users>;
    deleteuser(id: string): Promise<string>;
}
