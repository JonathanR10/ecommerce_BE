"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const products_entity_1 = require("./products.entity");
const categories_entity_1 = require("./categories.entity");
const data_1 = require("../utils/data");
let ProductsRepository = class ProductsRepository {
    ormProductsRepository;
    ormCategoriesRepository;
    constructor(ormProductsRepository, ormCategoriesRepository) {
        this.ormProductsRepository = ormProductsRepository;
        this.ormCategoriesRepository = ormCategoriesRepository;
    }
    async getAllProducts(page, limit) {
        const skip = (page - 1) * limit;
        const products = await this.ormProductsRepository.find({
            relations: {
                category: true,
            },
            skip: skip,
            take: limit,
        });
        return products;
    }
    async addProducts() {
        const categories = await this.ormCategoriesRepository.find();
        await Promise.all(data_1.allProducts.map(async (elem) => {
            const category = categories.find((category) => category.name === elem.category);
            if (!category)
                throw new Error(`La categoría ${elem.category} no existe`);
            const product = new products_entity_1.Products();
            product.name = elem.name;
            product.description = elem.description;
            product.price = elem.price;
            product.stock = elem.stock;
            product.category = category;
            await this.ormProductsRepository
                .createQueryBuilder()
                .insert()
                .into(products_entity_1.Products)
                .values(product)
                .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
                .execute();
        }));
        return 'Productos agregados';
    }
    async getProductById(id) {
        const product = await this.ormProductsRepository.findOneBy({ id });
        if (!product)
            return `El producto con ${id} no fue encontrado`;
        return product;
    }
    async updateProduct(id, newProductData) {
        await this.ormProductsRepository.update(id, newProductData);
        const updatedProduct = this.ormProductsRepository.findOneBy({ id });
        return updatedProduct;
    }
    async deleteProduct(id) {
        const product = await this.ormProductsRepository.findOneBy({ id });
        if (!product)
            return `Producto con id= ${id} no encontrado`;
        await this.ormProductsRepository.delete(id);
        return `Producto con id= ${id} eliminado`;
    }
};
exports.ProductsRepository = ProductsRepository;
exports.ProductsRepository = ProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_entity_1.Products)),
    __param(1, (0, typeorm_1.InjectRepository)(categories_entity_1.Categories)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsRepository);
//# sourceMappingURL=products.repository.js.map