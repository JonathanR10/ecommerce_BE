import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.ordersService.getOderById(id);
  }

  @Post()
  addOrder(@Body() newOrderData: any) {
    return this.ordersService.addOrder(newOrderData);
  }
}
