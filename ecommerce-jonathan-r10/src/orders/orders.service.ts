import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/createOrders.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  getOderById(id: string) {
    return this.ordersRepository.getOrderById(id);
  }

  addOrder(newOrderData: CreateOrderDto) {
    return this.ordersRepository.addOrder(newOrderData);
  }
}
