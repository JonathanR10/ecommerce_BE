import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  getOderById(id: string) {
    return this.ordersRepository.getOrderById(id);
  }

  addOrder(newOrderData: any) {
    return this.ordersRepository.addOrder(newOrderData);
  }
}
