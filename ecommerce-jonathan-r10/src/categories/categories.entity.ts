import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Products } from 'src/products/products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'CATEGORIES',
})
export class Categories {
  @ApiProperty({
    description: 'Es una string en formato UUID v4',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    description:
      'Es valor de tipo string para indicar el nombre de la categoría',
    maxLength: 50,
    nullable: false,
    example: 'Test Category',
    uniqueItems: true,
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  name!: string;

  @ApiHideProperty()
  @OneToMany(() => Products, (product) => product.category)
  @JoinColumn()
  products!: Products[];
}
