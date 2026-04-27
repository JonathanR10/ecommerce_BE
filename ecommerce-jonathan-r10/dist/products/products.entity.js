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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const typeorm_1 = require("typeorm");
const orderdetails_entity_1 = require("../orders/orderdetails.entity");
const categories_entity_1 = require("../categories/categories.entity");
let Products = class Products {
    id;
    name;
    description;
    price;
    stock;
    imgUrl;
    isActive;
    category;
    order_details;
    createdAt;
    updatedAt;
};
exports.Products = Products;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Products.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false,
    }),
    __metadata("design:type", String)
], Products.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: false,
    }),
    __metadata("design:type", String)
], Products.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    }),
    __metadata("design:type", Number)
], Products.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false,
    }),
    __metadata("design:type", Number)
], Products.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        default: 'https://st3.depositphotos.com/1322515/35964/v/600/depositphotos_359648638-stock-illustration-image-available-icon.jpg',
    }),
    __metadata("design:type", String)
], Products.prototype, "imgUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Products.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categories_entity_1.Categories, (categories) => categories.products),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", categories_entity_1.Categories)
], Products.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => orderdetails_entity_1.OrderDetails, (orderDetails) => orderDetails.products),
    __metadata("design:type", Array)
], Products.prototype, "order_details", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Products.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Products.prototype, "updatedAt", void 0);
exports.Products = Products = __decorate([
    (0, typeorm_1.Entity)({ name: 'PRODUCTS' })
], Products);
//# sourceMappingURL=products.entity.js.map