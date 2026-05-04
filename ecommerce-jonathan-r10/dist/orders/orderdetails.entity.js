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
exports.OrderDetails = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const orders_entity_1 = require("./orders.entity");
const products_entity_1 = require("../products/products.entity");
const swagger_1 = require("@nestjs/swagger");
let OrderDetails = class OrderDetails {
    id;
    price;
    order;
    products;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, price: { required: true, type: () => Number }, order: { required: true, type: () => require("./orders.entity").Orders }, products: { required: true, type: () => [require("../products/products.entity").Products] } };
    }
};
exports.OrderDetails = OrderDetails;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Es una string en formato UUID v4',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderDetails.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Es valor de tipo number. Puede contener en total 10 digitos, considerando 2 para los decimales',
        nullable: false,
        example: '12345678.95',
    }),
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    }),
    __metadata("design:type", Number)
], OrderDetails.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica la relación 1 a 1 con la orden a la que pertenece.',
    }),
    (0, typeorm_1.OneToOne)(() => orders_entity_1.Orders, (order) => order.orderDetails),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    __metadata("design:type", orders_entity_1.Orders)
], OrderDetails.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica la relación n a n con los productos que corresponden al detalle de la orden.',
    }),
    (0, typeorm_1.ManyToMany)(() => products_entity_1.Products),
    (0, typeorm_1.JoinTable)({
        name: 'ORDERDETAILS_PRODUCTS',
        joinColumn: {
            name: 'product_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'oderdetail_id',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], OrderDetails.prototype, "products", void 0);
exports.OrderDetails = OrderDetails = __decorate([
    (0, typeorm_1.Entity)({ name: 'ORDERDETAILS' })
], OrderDetails);
//# sourceMappingURL=orderdetails.entity.js.map