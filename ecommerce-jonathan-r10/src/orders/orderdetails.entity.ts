import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from './orders.entity';
import { Products } from 'src/products/products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'ORDERDETAILS' })
export class OrderDetails {
  @ApiProperty({
    description: 'Es una string en formato UUID v4',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description:
      'Es valor de tipo number. Puede contener en total 10 digitos, considerando 2 para los decimales',
    nullable: false,
    example: '12345678.95',
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price!: number;

  @ApiProperty({
    description: 'Indica la relación 1 a 1 con la orden a la que pertenece.',
  })
  @OneToOne(() => Orders, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order!: Orders;

  @ApiProperty({
    description:
      'Indica la relación n a n con los productos que corresponden al detalle de la orden.',
  })
  @ManyToMany(() => Products)
  @JoinTable({
    name: 'ORDERDETAILS_PRODUCTS',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'oderdetail_id',
      referencedColumnName: 'id',
    },
  })
  products!: Products[];
}
