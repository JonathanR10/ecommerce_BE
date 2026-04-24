import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrders.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  getOrderById(@Param('id') id: string) {
    return this.ordersService.getOderById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  addOrder(@Body() newOrderData: CreateOrderDto) {
    return this.ordersService.addOrder(newOrderData);
  }
}
