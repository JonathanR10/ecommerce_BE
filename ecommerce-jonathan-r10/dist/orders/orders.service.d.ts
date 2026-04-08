import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/createOrders.dto';
export declare class OrdersService {
    private readonly ordersRepository;
    constructor(ordersRepository: OrdersRepository);
    getOderById(id: string): Promise<string | import("./orders.entity").Orders>;
    addOrder(newOrderData: CreateOrderDto): Promise<string | import("./orders.entity").Orders[]>;
}
