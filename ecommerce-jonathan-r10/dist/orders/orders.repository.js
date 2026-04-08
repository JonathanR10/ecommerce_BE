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
exports.OrdersRepository = void 0;
const common_1 = require("@nestjs/common");
const orders_entity_1 = require("./orders.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const orderdetails_entity_1 = require("./orderdetails.entity");
const users_entity_1 = require("../users/users.entity");
const products_entity_1 = require("../products/products.entity");
let OrdersRepository = class OrdersRepository {
    ormOrdersRepository;
    ormOrderDetailsRepository;
    ormUsersRepository;
    ormProductsRepository;
    constructor(ormOrdersRepository, ormOrderDetailsRepository, ormUsersRepository, ormProductsRepository) {
        this.ormOrdersRepository = ormOrdersRepository;
        this.ormOrderDetailsRepository = ormOrderDetailsRepository;
        this.ormUsersRepository = ormUsersRepository;
        this.ormProductsRepository = ormProductsRepository;
    }
    async getOrderById(id) {
        const order = await this.ormOrdersRepository.findOne({
            where: { id },
            relations: {
                orderDetails: {
                    products: true,
                },
            },
        });
        if (!order)
            return `Order con id= ${id} no encontrada`;
        return order;
    }
    async addOrder(newOrderData) {
        const { userId, products } = newOrderData;
        const user = await this.ormUsersRepository.findOneBy({ id: userId });
        if (!user)
            return `Usuario con id=${userId} no encontrado`;
        const order = new orders_entity_1.Orders();
        order.date = new Date();
        order.user = user;
        const newOrder = await this.ormOrdersRepository.save(order);
        const productsArray = await Promise.all(products.map(async (elem) => {
            const product = await this.ormProductsRepository.findOneBy({
                id: elem.id,
            });
            if (!product)
                return `El producto con id: ${elem.id} no existe`;
            await this.ormProductsRepository.update({ id: product.id }, { stock: product.stock - 1 });
            return product;
        }));
        const total = productsArray.reduce((sum, prod) => sum + Number(prod.price), 0);
        const orderDetail = new orderdetails_entity_1.OrderDetails();
        orderDetail.price = Number(Number(total).toFixed(2));
        orderDetail.products = productsArray;
        orderDetail.order = newOrder;
        await this.ormOrderDetailsRepository.save(orderDetail);
        return await this.ormOrdersRepository.find({
            where: { id: newOrder.id },
            relations: {
                orderDetails: {
                    products: {
                        category: true,
                    },
                },
            },
        });
    }
};
exports.OrdersRepository = OrdersRepository;
exports.OrdersRepository = OrdersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(orders_entity_1.Orders)),
    __param(1, (0, typeorm_2.InjectRepository)(orderdetails_entity_1.OrderDetails)),
    __param(2, (0, typeorm_2.InjectRepository)(users_entity_1.Users)),
    __param(3, (0, typeorm_2.InjectRepository)(products_entity_1.Products)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], OrdersRepository);
//# sourceMappingURL=orders.repository.js.map