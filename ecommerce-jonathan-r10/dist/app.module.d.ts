import { MiddlewareConsumer, NestModule, OnApplicationBootstrap } from '@nestjs/common';
import { CategoriesService } from './categories/categories.service';
import { ProductsService } from './products/products.service';
import { UsersService } from './users/users.service';
export declare class AppModule implements NestModule, OnApplicationBootstrap {
    private readonly categoriesService;
    private readonly productsService;
    private readonly userService;
    constructor(categoriesService: CategoriesService, productsService: ProductsService, userService: UsersService);
    configure(consumer: MiddlewareConsumer): void;
    onApplicationBootstrap(): Promise<void>;
}
