import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './products.entity';
import { allProducts } from 'src/utils/data';
import { Categories } from 'src/categories/categories.entity';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private readonly ormProductsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private readonly ormCategoriesRepository: Repository<Categories>,
  ) {}

  async getAllProducts(page: number, limit: number): Promise<Products[]> {
    const skip = (page - 1) * limit;
    const products = await this.ormProductsRepository.find({
      relations: {
        category: true,
      },
      skip: skip,
      take: limit,
    });

    return products;
  }

  async addProducts(): Promise<string> {
    const categories = await this.ormCategoriesRepository.find();
    await Promise.all(
      allProducts.map(async (elem) => {
        const category = categories.find(
          (category) => category.name === elem.category,
        );
        if (!category)
          throw new NotFoundException(
            `La categoría ${elem.category} no existe`,
          );

        const product = new Products();
        product.name = elem.name;
        product.description = elem.description;
        product.price = elem.price;
        product.stock = elem.stock;
        product.category = category;

        await this.ormProductsRepository
          .createQueryBuilder()
          .insert()
          .into(Products)
          .values(product)
          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
          .execute();
      }),
    );
    return 'Productos agregados';
  }

  async getProductById(id: string): Promise<Products> {
    const product = await this.ormProductsRepository.findOneBy({ id });
    if (!product)
      throw new NotFoundException(`El producto con ${id} no fue encontrado`);
    return product;
  }

  async updateProduct(
    id: string,
    newProductData: Products,
  ): Promise<Products | null> {
    const product = await this.ormProductsRepository.findOneBy({ id });
    if (!product)
      throw new NotFoundException(`El producto con ${id} no fue encontrado`);
    await this.ormProductsRepository.update(id, newProductData);
    const updatedProduct = this.ormProductsRepository.findOneBy({ id });
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<string> {
    const product = await this.ormProductsRepository.findOneBy({ id });
    if (!product)
      throw new NotFoundException(`Producto con id= ${id} no encontrado`);
    product.isActive = false;
    await this.ormProductsRepository.save(product);
    return `Producto con id= ${id} eliminado`;
  }

  async updateProductImgUrl(id: string, imgUrl: string) {
    const productFound = await this.ormProductsRepository.findOneBy({ id });
    if (!productFound)
      throw new NotFoundException({
        message: `No se encontro producto con Id= ${id}`,
      });

    productFound.imgUrl = imgUrl;

    await this.ormProductsRepository.save(productFound);

    return await this.ormProductsRepository.findOneBy({ id });
  }
}
