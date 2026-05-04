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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_interceptors_1 = require("../interceptors/users.interceptors");
const auth_guard_1 = require("../auth/guards/auth.guard");
const UpdateUser_dto_1 = require("./DTO/UpdateUser.dto");
const roles_decorator_1 = require("../decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_enum_1 = require("../common/roles.enum");
const swagger_1 = require("@nestjs/swagger");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    getAllUsers(page, limit) {
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const validPage = isNaN(pageNum) || pageNum <= 0 ? 1 : pageNum;
        const validLimit = isNaN(limitNum) || limitNum <= 0 ? 5 : limitNum;
        return this.usersService.getAllUsersService(validPage, validLimit);
    }
    getUserById(id) {
        return this.usersService.getUserByIdService(id);
    }
    updateUser(id, newUserData) {
        return this.usersService.updateUserService(id, newUserData);
    }
    deleteUser(id) {
        return this.usersService.deleteUserService(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene el listado de todos los usuarios' }),
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
        description: 'Numero de usuarios por pagina',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Sesión invalida' }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Permisos insuficientes para acceder a la ruta',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Acceso al listado de usuarios correctamente',
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseInterceptors)(users_interceptors_1.UsersInterceptor),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtiene la información del usuario correspondiente al id proporcionado',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuario encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Sesión invalida' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuario no encontrado' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)(users_interceptors_1.UsersInterceptor),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualiza la información del usuario correspondiente al id',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Id del usuario que se desea actualizar',
        type: 'string',
    }),
    (0, swagger_1.ApiBody)({ type: UpdateUser_dto_1.UpdateUserDto }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuario actualizado correctamente',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Sesión invalida' }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Usuario no encontrado o los parametros a actualizar no cumplen con los requisitos',
    }),
    (0, common_1.UseInterceptors)(users_interceptors_1.UsersInterceptor),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateUser_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Elimina al usuario correspondiente al id proporcionado',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Id del usuario que se desea borrar',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuario borrado correctamente',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Sesión invalida' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuario no encontrado' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map