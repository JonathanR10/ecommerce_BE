import { ProductsRepository } from './products.repository';
import { Products } from './products.entity';
export declare class ProductsService {
    private readonly productsRepository;
    constructor(productsRepository: ProductsRepository);
    getAllProducts(page: number, limit: number): Promise<Products[]>;
    addProducts(): Promise<string>;
    getProductById(id: string): Promise<string | Products>;
    updateProduct(id: string, newProductData: Products): Promise<Products | null>;
    deleteProduct(id: string): Promise<string>;
}
