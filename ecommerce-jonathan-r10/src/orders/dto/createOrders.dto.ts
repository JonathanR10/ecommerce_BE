import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Products } from 'src/products/products.entity';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'El id del usuario es requerido' })
  @IsUUID(4, { message: 'El UUID debe ser v4' })
  userId!: string;

  @IsArray()
  @ArrayMinSize(1, {
    message: 'Debe de tener al menos un producto en la lista',
  })
  products!: Partial<Products[]>;
}
