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
exports.UpdateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateUserDto {
    email;
    id;
    password;
    phone;
    name;
    address;
    country;
    city;
    static _OPENAPI_METADATA_FACTORY() {
        return { password: { required: false, type: () => String, minLength: 8, maxLength: 15 }, phone: { required: false, type: () => Number, minimum: 100000000, maximum: 999999999 }, name: { required: false, type: () => String, minLength: 3, maxLength: 80 }, address: { required: false, type: () => String, minLength: 3, maxLength: 80 }, country: { required: false, type: () => String, minLength: 5, maxLength: 20 }, city: { required: false, type: () => String, minLength: 5, maxLength: 20 } };
    }
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsEmpty)({ message: 'Email no es un parametro editable' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsEmpty)({ message: 'Id no es un parametro editable' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'La contraseña debe contener al menos 1 minuscula, 1 mayuscula, 1 numero y 1 simbolo. La longitud es entre 8 y 15 caracteres',
        example: 'aaBB33##',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Contraseña no puede ir vacía' }),
    (0, class_validator_1.IsString)({ message: 'Contraseña debe ser un string' }),
    (0, class_validator_1.MinLength)(8, { message: 'Contraseña no debe ser menor a 8 caracteres' }),
    (0, class_validator_1.MaxLength)(15, { message: 'Contraseña no debe ser mayor a 15 caracteres' }),
    (0, class_validator_1.IsStrongPassword)({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }, {
        message: 'Contraseña debe contener al menos 1 minuscula, 1 mayuscula, 1 numero y 1 simbolo',
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe de ser un numero valido y no puede ir vacio. Formato de 9 digitos exactamente',
        example: '123456789',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Telefono no puede ir vacio' }),
    (0, class_validator_1.IsNumber)({
        allowNaN: false,
        allowInfinity: false,
    }, { message: 'Telefono debe de ser un numero valido' }),
    (0, class_validator_1.Min)(100000000, { message: 'Longitud debe de ser 9 digitos exactamente' }),
    (0, class_validator_1.Max)(999999999, { message: 'Longitud debe de ser 9 digitos exactamente' }),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe ser una cadena de texto de entre 3 y 80 caracteres',
        example: 'Test User 001',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre no puede ir vacío' }),
    (0, class_validator_1.IsString)({ message: 'El nombre debe de ser un string' }),
    (0, class_validator_1.MinLength)(3, { message: 'El nombre de al menos 3 caractres' }),
    (0, class_validator_1.MaxLength)(80, { message: 'El nombre de no mas de 80 caracteres' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe de contener entre 3 y 80 caracteres',
        example: 'Test Street #1 main Ave.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Dirección debe ser un string' }),
    (0, class_validator_1.MinLength)(3, { message: 'Dirección no debe ser menor a 3 caracteres' }),
    (0, class_validator_1.MaxLength)(80, { message: 'Dirección no debe ser mayor a 80 caracteres' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe de contener entre 5 y 20 caracteres',
        example: 'Test Country',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'País debe ser un string' }),
    (0, class_validator_1.MinLength)(5, { message: 'País no debe ser menor a 5 caracteres' }),
    (0, class_validator_1.MaxLength)(20, { message: 'País no debe ser mayor a 20 caracteres' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe de contener entre 5 y 20 caracteres',
        example: 'Test City',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Ciudad debe ser un string' }),
    (0, class_validator_1.MinLength)(5, { message: 'Ciudad no debe ser menor a 5 caracteres' }),
    (0, class_validator_1.MaxLength)(20, { message: 'Ciudad no debe ser mayor a 20 caracteres' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "city", void 0);
//# sourceMappingURL=UpdateUser.dto.js.map