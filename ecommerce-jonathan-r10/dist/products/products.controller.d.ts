import { ProductsService } from './products.service';
import { Product } from './products.repository';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getAllProducts(): Product[];
}
