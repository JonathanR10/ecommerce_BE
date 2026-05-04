import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
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
  @ApiProperty({
    description: 'Es una string en formato UUID v4',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Es valor de tipo string',
    maxLength: 50,
    nullable: false,
    example: 'Test User',
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name!: string;

  @ApiProperty({
    description: 'Es valor de tipo string con formato de email',
    maxLength: 50,
    nullable: false,
    example: 'testUser@mail.com',
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email!: string;

  @ApiProperty({
    description:
      'Es valor de tipo string. La contraseña debe contener al menos 1 minuscula, 1 mayuscula, 1 numero y 1 simbolo.',
    maxLength: 80,
    nullable: false,
    example: 'aaBB33##',
  })
  @Column({
    type: 'varchar',
    length: 80,
    nullable: false,
  })
  password!: string;

  @ApiProperty({
    description: 'Es valor de tipo int',
    example: '55123456',
  })
  @Column({
    type: 'int',
  })
  phone!: number;

  @ApiProperty({
    description: 'Es valor de tipo string',
    maxLength: 50,
    example: 'Test Country',
  })
  @Column({
    type: 'varchar',
    length: 50,
  })
  country!: string;

  @ApiProperty({
    description: 'Es valor de tipo string',
    maxLength: 50,
    example: 'Test city',
  })
  @Column({
    type: 'varchar',
    length: 50,
  })
  city!: string;

  @ApiHideProperty()
  @Column({
    type: 'boolean',
    default: true,
  })
  isActive!: boolean;

  @ApiProperty({
    description: 'Es valor de tipo string',
    example: 'Test street 155 main Ave.',
  })
  @Column({
    type: 'text',
  })
  address!: string;

  @ApiHideProperty()
  @Column({
    type: 'boolean',
    default: false,
  })
  isAdmin!: boolean;

  @ApiProperty({
    description: 'Es arreglo que contiene las ordenes del usuario',
  })
  @OneToMany(() => Orders, (order) => order.user)
  orders!: Orders[];

  @ApiHideProperty()
  @CreateDateColumn()
  createdAt!: Date;

  @ApiHideProperty()
  @UpdateDateColumn()
  updatedAt!: Date;
}
