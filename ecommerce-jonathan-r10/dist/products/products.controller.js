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
exports.ProductsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const products_entity_1 = require("./products.entity");
const auth_guard_1 = require("../auth/guards/auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
const roles_enum_1 = require("../common/roles.enum");
const swagger_1 = require("@nestjs/swagger");
let ProductsController = class ProductsController {
    productsService;
    constructor(productsService) {
        this.productsService = productsService;
    }
    getAllProducts(page, limit) {
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const validPage = isNaN(pageNum) || pageNum <= 0 ? 1 : pageNum;
        const validLimit = isNaN(limitNum) || limitNum <= 0 ? 5 : limitNum;
        return this.productsService.getAllProducts(validPage, validLimit);
    }
    addProducts() {
        return this.productsService.addProducts();
    }
    getProductById(id) {
        return this.productsService.getProductById(id);
    }
    updateProduct(id, newProductData) {
        return this.productsService.updateProduct(id, newProductData);
    }
    deleteProduct(id) {
        return this.productsService.deleteProduct(id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene el listado de todos los productos' }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: String,
        description: 'Numero de pagina para el paginado',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: String,
        description: 'Numero de productos por pagina',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Acceso al listado de productos correctamente',
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Get)('seeder'),
    (0, swagger_1.ApiOperation)({
        summary: 'Ruta para agregar productos (seeder)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Productos agregados correctamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'La categoría para el producto a agregar no existe',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "addProducts", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtiene la información del producto correspondiente al id proporcionado',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Productos retornado correctamente',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Producto no encontrado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualiza la información del producto correspondiente al id',
    }),
    (0, swagger_1.ApiBody)({ type: products_entity_1.Products }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'Id del producto a actualizar',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Sesión invalida' }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Permisos insuficientes para acceder a la ruta',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Producto no encontrado' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, products_entity_1.Products]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Borra el producto correspondiente al id',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'Id del producto a eliminar',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Productos eliminado correctamente',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Producto no encontrado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteProduct", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map