import { Categories } from 'src/products/categories.entity';
import { Repository } from 'typeorm';
export declare class CategoriesRepository {
    private readonly ormCategoriesRepository;
    constructor(ormCategoriesRepository: Repository<Categories>);
    getAllCategories(): Promise<Categories[]>;
    addCategories(): Promise<string>;
}
