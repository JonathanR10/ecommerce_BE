import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetails } from './orderdetails.entity';
import { Users } from 'src/users/users.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'ORDERS',
})
export class Orders {
  @ApiProperty({
    description: 'Es una string en formato UUID v4',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description:
      'Es una valor de tipo Date. Corresponde a la fecha de creación de la orden',
    example: '24/05/2026',
  })
  @Column()
  date!: Date;

  @ApiProperty({
    description:
      'Indica la relación 1 a 1 con el detalle de orden a la que pertenece.',
  })
  @OneToOne(() => OrderDetails, (OrderDetails) => OrderDetails.order)
  orderDetails!: OrderDetails;

  @ApiProperty({
    description:
      'Indica la relación n a 1 con el usuario al que le pertenecen.',
  })
  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user!: Users;
}
