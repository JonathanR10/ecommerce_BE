import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Products } from 'src/products/products.entity';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Es una string en formato UUID v4',
  })
  @IsNotEmpty({ message: 'El id del usuario es requerido' })
  @IsUUID('4', { message: 'El UUID debe ser v4' })
  userId!: string;

  @ApiProperty({
    description:
      'Es un array que contiene la lista de Id de productos del usuario. Cada id deve ser en formato UUID v4',
  })
  @IsArray()
  @ArrayMinSize(1, {
    message: 'Debe de tener al menos un producto en la lista',
  })
  @IsUUID('4', { each: true, message: 'El UUID de cada producto debe ser v4' })
  products!: string[];
}
