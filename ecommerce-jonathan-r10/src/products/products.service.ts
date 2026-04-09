import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getAllProducts(page: number, limit: number): Promise<Products[]> {
    return this.productsRepository.getAllProducts(page, limit);
  }

  addProducts(): Promise<string> {
    return this.productsRepository.addProducts();
  }

  getProductById(id: string): Promise<Products> {
    return this.productsRepository.getProductById(id);
  }

  updateProduct(id: string, newProductData: Products) {
    return this.productsRepository.updateProduct(id, newProductData);
  }

  deleteProduct(id: string): Promise<string> {
    return this.productsRepository.deleteProduct(id);
  }
}
