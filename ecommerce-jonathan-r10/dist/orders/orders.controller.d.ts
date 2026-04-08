import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrders.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getOrderById(id: string): Promise<string | import("./orders.entity").Orders>;
    addOrder(newOrderData: CreateOrderDto): Promise<string | import("./orders.entity").Orders[]>;
}
