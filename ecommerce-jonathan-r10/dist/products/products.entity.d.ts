import { OrderDetails } from 'src/orders/orderdetails.entity';
import { Categories } from 'src/categories/categories.entity';
export declare class Products {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl: string;
    isActive: boolean;
    category: Categories;
    order_details: OrderDetails[];
}
