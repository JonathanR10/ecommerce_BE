import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrders.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary:
      'Ruta para obtener la información de la orden correspondiente al id proporcionado',
  })
  @ApiParam({
    name: 'id',
    description: 'Id de la orden a encontrar',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Orden retornada correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Orden con id proporcionado no encontrada',
  })
  getOrderById(@Param('id') id: string) {
    return this.ordersService.getOderById(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Ruta para generar una nueva orden para el usuario',
  })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({
    status: 200,
    description: 'Orden generada correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario o producto no encontrado',
  })
  addOrder(@Body() newOrderData: CreateOrderDto) {
    return this.ordersService.addOrder(newOrderData);
  }
}
