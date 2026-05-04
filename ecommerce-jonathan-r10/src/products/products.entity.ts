import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderDetails } from 'src/orders/orderdetails.entity';
import { Categories } from 'src/categories/categories.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'PRODUCTS' })
export class Products {
  @ApiProperty({
    description: 'Es una string en formato UUID v4',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description: 'Es valor unico de tipo string',
    maxLength: 50,
    nullable: false,
    example: 'Test Product',
    uniqueItems: true,
  })
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  name!: string;

  @ApiProperty({
    description: 'Es valor de tipo string',
    nullable: false,
    example: 'Test Description',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  description!: string;

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
    description:
      'Es valor de tipo number. Indica la cantidad de stock del producto',
    nullable: false,
    example: '99',
  })
  @Column({
    type: 'int',
    nullable: false,
  })
  stock!: number;

  @ApiProperty({
    description:
      'Es valor de tipo string. Indica la URL de la imagen correspondiente al producto',
    nullable: false,
    example: 'https://www.google.com/img/example.jpg',
  })
  @Column({
    type: 'varchar',
    default:
      'https://st3.depositphotos.com/1322515/35964/v/600/depositphotos_359648638-stock-illustration-image-available-icon.jpg',
  })
  imgUrl!: string;

  @ApiHideProperty()
  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @ApiProperty({
    description:
      'Indica la relación del producto con la categoría a la que pertenece.',
  })
  @ManyToOne(() => Categories, (categories) => categories.products)
  @JoinColumn({ name: 'category_id' })
  category!: Categories;

  @ApiProperty({
    description:
      'Indica la relación de los productos con las ordenes a la que pertenecen.',
  })
  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  order_details!: OrderDetails[];

  @ApiHideProperty()
  @CreateDateColumn()
  createdAt!: Date;

  @ApiHideProperty()
  @UpdateDateColumn()
  updatedAt!: Date;
}
