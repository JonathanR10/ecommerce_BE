import { Orders } from 'src/orders/orders.entity';
export declare class Users {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: number;
    country: string;
    city: string;
    address: string;
    orders: Orders[];
}
