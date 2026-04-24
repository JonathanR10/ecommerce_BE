import { Repository } from 'typeorm';
import { Categories } from './categories.entity';
export declare class CategoriesRepository {
    private readonly ormCategoriesRepository;
    constructor(ormCategoriesRepository: Repository<Categories>);
    getAllCategories(): Promise<Categories[]>;
    addCategories(): Promise<string>;
}
