import { Injectable } from '@nestjs/common';
const products: Product[] = [
  {
    id: '1',
    name: 'Laptop HP Pavilion 15',
    description: 'Laptop con Intel Core i5, 8GB RAM y 512GB SSD',
    price: 13500,
    stock: 10,
    imgUrl:
      'https://www.legrand.es/modules/custom/legrand_ecat/assets/img/no-image.png',
  },
  {
    id: '2',
    name: 'iPhone 13',
    description: 'Smartphone con 128GB, cámara dual y chip A15',
    price: 14500,
    stock: 15,
    imgUrl:
      'https://www.legrand.es/modules/custom/legrand_ecat/assets/img/no-image.png',
  },
  {
    id: '3',
    name: 'Audífonos JBL Tune 510BT',
    description: 'Audífonos inalámbricos con batería de larga duración',
    price: 1200,
    stock: 25,
    imgUrl:
      'https://www.legrand.es/modules/custom/legrand_ecat/assets/img/no-image.png',
  },
  {
    id: '4',
    name: "Monitor Samsung 24''",
    description: 'Monitor Full HD con panel IPS',
    price: 3200,
    stock: 0,
    imgUrl:
      'https://www.legrand.es/modules/custom/legrand_ecat/assets/img/no-image.png',
  },
  {
    id: '5',
    name: 'Teclado Logitech K380',
    description: 'Teclado inalámbrico compacto Bluetooth',
    price: 800,
    stock: 30,
    imgUrl:
      'https://www.legrand.es/modules/custom/legrand_ecat/assets/img/no-image.png',
  },
  {
    id: '6',
    name: 'Mouse Gamer Razer DeathAdder',
    description: 'Mouse ergonómico con sensor óptico de alta precisión',
    price: 950,
    stock: 18,
    imgUrl:
      'https://www.legrand.es/modules/custom/legrand_ecat/assets/img/no-image.png',
  },
  {
    id: '7',
    name: 'Smart TV LG 55 pulgadas',
    description: 'Televisión 4K UHD con WebOS',
    price: 10500,
    stock: 5,
    imgUrl:
      'https://www.legrand.es/modules/custom/legrand_ecat/assets/img/no-image.png',
  },
  {
    id: '8',
    name: 'Tablet Samsung Galaxy Tab S7',
    description: 'Tablet con pantalla 11 pulgadas y 6GB RAM',
    price: 9800,
    stock: 7,
    imgUrl:
      'https://www.legrand.es/modules/custom/legrand_ecat/assets/img/no-image.png',
  },
  {
    id: '9',
    name: 'Disco SSD Kingston 1TB',
    description: 'Unidad de estado sólido de alta velocidad',
    price: 1800,
    stock: 20,
    imgUrl:
      'https://www.legrand.es/modules/custom/legrand_ecat/assets/img/no-image.png',
  },
  {
    id: '10',
    name: 'Router TP-Link AX1800',
    description: 'Router WiFi 6 de alta velocidad',
    price: 1600,
    stock: 12,
    imgUrl:
      'https://www.legrand.es/modules/custom/legrand_ecat/assets/img/no-image.png',
  },
];

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
}

@Injectable()
export class ProductsRepository {
  getAllProducts(): Product[] {
    return products;
  }
}
