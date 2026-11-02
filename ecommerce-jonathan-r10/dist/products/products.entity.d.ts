import { OrderDetails } from "../orders/orderdetails.entity";
import { Categories } from "../categories/categories.entity";
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
    createdAt: Date;
    updatedAt: Date;
}
