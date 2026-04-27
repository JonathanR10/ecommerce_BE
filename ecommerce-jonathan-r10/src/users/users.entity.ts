import { Orders } from 'src/orders/orders.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'USERS',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name!: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: false,
  })
  password!: string;

  @Column({
    type: 'int',
  })
  phone!: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  country!: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  city!: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive!: boolean;

  @Column({
    type: 'text',
  })
  address!: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isAdmin!: boolean;

  @OneToMany(() => Orders, (order) => order.user)
  orders!: Orders[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
