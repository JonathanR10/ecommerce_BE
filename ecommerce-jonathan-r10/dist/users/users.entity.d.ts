import { Orders } from 'src/orders/orders.entity';
export declare class Users {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: number;
    country: string;
    city: string;
    isActive: boolean;
    address: string;
    isAdmin: boolean;
    orders: Orders[];
    createdAt: Date;
    updatedAt: Date;
}
