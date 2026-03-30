export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl: string;
}
export declare class ProductsRepository {
    getAllProducts(): Product[];
}
