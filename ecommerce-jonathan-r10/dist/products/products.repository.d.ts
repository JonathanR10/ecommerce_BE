import { Repository } from 'typeorm';
import { Products } from './products.entity';
import { Categories } from './categories.entity';
export declare class ProductsRepository {
    private readonly ormProductsRepository;
    private readonly ormCategoriesRepository;
    constructor(ormProductsRepository: Repository<Products>, ormCategoriesRepository: Repository<Categories>);
    getAllProducts(page: number, limit: number): Promise<Products[]>;
    addProducts(): Promise<string>;
    getProductById(id: string): Promise<Products | string>;
    updateProduct(id: string, newProductData: Products): Promise<Products | null>;
    deleteProduct(id: string): Promise<string>;
}
