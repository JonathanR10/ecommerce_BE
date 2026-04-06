export interface User {
    id: string;
    email: string;
    name: string;
    password: string;
    address: string;
    phone: string;
    country?: string | undefined;
    city?: string | undefined;
}
export declare class UsersRepository {
    getAllUsers(page: number, limit: number): User[];
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
    getUserByEmail(email: string): {
        id: string;
        email: string;
        name: string;
        password: string;
        address: string;
        phone: string;
        country: string;
        city: string;
    } | undefined;
    addUser(newUser: any): any;
    updateUser(id: string, userNewData: any): string;
    deleteuser(id: string): string;
}
