import { MiddlewareConsumer, NestModule, OnApplicationBootstrap } from '@nestjs/common';
import { CategoriesService } from './categories/categories.service';
import { ProductsService } from './products/products.service';
export declare class AppModule implements NestModule, OnApplicationBootstrap {
    private readonly categoriesService;
    private readonly productsService;
    constructor(categoriesService: CategoriesService, productsService: ProductsService);
    configure(consumer: MiddlewareConsumer): void;
    onApplicationBootstrap(): Promise<void>;
}
