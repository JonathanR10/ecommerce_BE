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

@Entity({
  name: 'ORDERS',
})
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  date!: Date;

  @OneToOne(() => OrderDetails, (OrderDetails) => OrderDetails.order)
  orderDetails!: OrderDetails;

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user!: Users;
}
