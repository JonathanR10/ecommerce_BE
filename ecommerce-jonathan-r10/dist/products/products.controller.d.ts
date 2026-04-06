import { ProductsService } from './products.service';
import { Products } from './products.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getAllProducts(page?: string, limit?: string): Promise<Products[]>;
    addProducts(): Promise<string>;
    getProductById(id: string): Promise<string | Products>;
    updateProduct(id: string, newProductData: Products): Promise<Products | null>;
    deleteProduct(id: string): Promise<string>;
}
