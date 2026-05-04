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
exports.Users = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const orders_entity_1 = require("../orders/orders.entity");
const typeorm_1 = require("typeorm");
let Users = class Users {
    id;
    name;
    email;
    password;
    phone;
    country;
    city;
    isActive;
    address;
    isAdmin;
    orders;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, phone: { required: true, type: () => Number }, country: { required: true, type: () => String }, city: { required: true, type: () => String }, address: { required: true, type: () => String }, orders: { required: true, type: () => [require("../orders/orders.entity").Orders] } };
    }
};
exports.Users = Users;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Es una string en formato UUID v4',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Es valor de tipo string',
        maxLength: 50,
        nullable: false,
        example: 'Test User',
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        nullable: false,
    }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Es valor de tipo string con formato de email',
        maxLength: 50,
        nullable: false,
        example: 'testUser@mail.com',
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Es valor de tipo string. La contraseña debe contener al menos 1 minuscula, 1 mayuscula, 1 numero y 1 simbolo.',
        maxLength: 80,
        nullable: false,
        example: 'aaBB33##',
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 80,
        nullable: false,
    }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Es valor de tipo int',
        example: '55123456',
    }),
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], Users.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Es valor de tipo string',
        maxLength: 50,
        example: 'Test Country',
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
    }),
    __metadata("design:type", String)
], Users.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Es valor de tipo string',
        maxLength: 50,
        example: 'Test city',
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
    }),
    __metadata("design:type", String)
], Users.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: true,
    }),
    __metadata("design:type", Boolean)
], Users.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Es valor de tipo string',
        example: 'Test street 155 main Ave.',
    }),
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    __metadata("design:type", String)
], Users.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: false,
    }),
    __metadata("design:type", Boolean)
], Users.prototype, "isAdmin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Es arreglo que contiene las ordenes del usuario',
    }),
    (0, typeorm_1.OneToMany)(() => orders_entity_1.Orders, (order) => order.user),
    __metadata("design:type", Array)
], Users.prototype, "orders", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Users.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Users.prototype, "updatedAt", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)({
        name: 'USERS',
    })
], Users);
//# sourceMappingURL=users.entity.js.map