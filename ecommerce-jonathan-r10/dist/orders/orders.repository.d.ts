import { Orders } from './orders.entity';
import { Repository } from 'typeorm';
import { OrderDetails } from './orderdetails.entity';
import { Users } from 'src/users/users.entity';
import { Products } from 'src/products/products.entity';
import { CreateOrderDto } from './dto/createOrders.dto';
export declare class OrdersRepository {
    private readonly ormOrdersRepository;
    private readonly ormOrderDetailsRepository;
    private readonly ormUsersRepository;
    private readonly ormProductsRepository;
    constructor(ormOrdersRepository: Repository<Orders>, ormOrderDetailsRepository: Repository<OrderDetails>, ormUsersRepository: Repository<Users>, ormProductsRepository: Repository<Products>);
    getOrderById(id: string): Promise<Orders>;
    addOrder(newOrderData: CreateOrderDto): Promise<Orders[]>;
}
