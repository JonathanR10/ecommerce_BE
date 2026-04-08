/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { Orders } from './orders.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from './orderdetails.entity';
import { Users } from 'src/users/users.entity';
import { Products } from 'src/products/products.entity';
import { CreateOrderDto } from './dto/createOrders.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private readonly ormOrdersRepository: Repository<Orders>,

    @InjectRepository(OrderDetails)
    private readonly ormOrderDetailsRepository: Repository<OrderDetails>,

    @InjectRepository(Users)
    private readonly ormUsersRepository: Repository<Users>,

    @InjectRepository(Products)
    private readonly ormProductsRepository: Repository<Products>,
  ) {}

  async getOrderById(id: string): Promise<Orders | string> {
    const order = await this.ormOrdersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });
    if (!order) return `Order con id= ${id} no encontrada`;

    return order;
  }

  async addOrder(newOrderData: any): Promise<Orders[] | string> {
    // Se desestrucutra la info que llega
    const { userId, products } = newOrderData;
    // Se busca que el usuario exista
    const user = await this.ormUsersRepository.findOneBy({ id: userId });
    if (!user) return `Usuario con id=${userId} no encontrado`;

    // Se crea la orden
    const order = new Orders();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.ormOrdersRepository.save(order);

    const productsArray = await Promise.all(
      products.map(async (elem) => {
        const product = await this.ormProductsRepository.findOneBy({
          id: elem.id,
        });

        if (!product) return `El producto con id: ${elem.id} no existe`;

        await this.ormProductsRepository.update(
          { id: product.id },
          { stock: product.stock - 1 },
        );

        return product;
      }),
    );

    const total = productsArray.reduce(
      (sum, prod) => sum + Number(prod.price),
      0,
    );

    const orderDetail = new OrderDetails();
    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;
    await this.ormOrderDetailsRepository.save(orderDetail);

    return await this.ormOrdersRepository.find({
      where: { id: newOrder.id },
      relations: {
        orderDetails: {
          products: {
            category: true,
          },
        },
      },
    });
  }
}
