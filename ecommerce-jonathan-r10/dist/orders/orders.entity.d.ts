import { OrderDetails } from './orderdetails.entity';
import { Users } from 'src/users/users.entity';
export declare class Orders {
    id: string;
    date: Date;
    orderDetails: OrderDetails;
    user: Users;
}
