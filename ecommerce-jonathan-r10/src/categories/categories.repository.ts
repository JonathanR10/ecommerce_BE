import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { allProducts } from 'src/utils/data';
import { Repository } from 'typeorm';
import { Categories } from './categories.entity';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private readonly ormCategoriesRepository: Repository<Categories>,
  ) {}

  async getAllCategories(): Promise<Categories[]> {
    return await this.ormCategoriesRepository.find();
  }

  async addCategories(): Promise<string> {
    const insertPromises = allProducts.map((elem) =>
      this.ormCategoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Categories)
        .values({ name: elem.category })
        .orIgnore()
        .execute(),
    );

    await Promise.all(insertPromises);

    return 'Categorias agregadas';
  }
}
