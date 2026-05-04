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
exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const matchPassword_decorator_1 = require("../../decorators/matchPassword.decorator");
class CreateUserDto {
    name;
    email;
    password;
    confirmPassword;
    phone;
    address;
    country;
    city;
    isAdmin;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 3, maxLength: 80 }, email: { required: true, type: () => String, format: "email" }, password: { required: true, type: () => String, minLength: 8, maxLength: 15 }, confirmPassword: { required: true, type: () => String }, phone: { required: true, type: () => Number, minimum: 100000000, maximum: 999999999 }, address: { required: true, type: () => String, minLength: 3, maxLength: 80 }, country: { required: true, type: () => String, minLength: 5, maxLength: 20 }, city: { required: true, type: () => String, minLength: 5, maxLength: 20 } };
    }
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe ser una cadena de texto de entre 3 y 80 caracteres',
        example: 'Test User 001',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre no puede ir vacío' }),
    (0, class_validator_1.IsString)({ message: 'El nombre debe de ser un string' }),
    (0, class_validator_1.MinLength)(3, { message: 'El nombre de al menos 3 caractres' }),
    (0, class_validator_1.MaxLength)(80, { message: 'El nombre de no mas de 80 caracteres' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe de ser un correo electronico con formato valido',
        example: 'testuser001@email.com',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El email no puede ir vacío' }),
    (0, class_validator_1.IsEmail)({}, { message: 'El email debe de tener un formato válido' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'La contraseña debe contener al menos 1 minuscula, 1 mayuscula, 1 numero y 1 simbolo. La longitud es entre 8 y 15 caracteres',
        example: 'aaBB33##',
    }),
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
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe ser igual a la contraseña',
        example: 'aaBB33##',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La confirmación de la contraseña no puede ir vacia' }),
    (0, class_validator_1.Validate)(matchPassword_decorator_1.MatchPassword, ['password']),
    __metadata("design:type", String)
], CreateUserDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe de ser un numero valido y no puede ir vacio. Longitud de 9 digitos',
        example: '551234567',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Telefono no puede ir vacio' }),
    (0, class_validator_1.IsNumber)({
        allowNaN: false,
        allowInfinity: false,
    }, { message: 'Telefono debe de ser un numero valido' }),
    (0, class_validator_1.Min)(100000000, { message: 'Longitud debe de ser 9 digitos exactamente' }),
    (0, class_validator_1.Max)(999999999, { message: 'Longitud debe de ser 9 digitos exactamente' }),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe de contener entre 3 y 80 caracteres.',
        example: 'Test Street #1 main Ave.',
    }),
    (0, class_validator_1.IsString)({ message: 'Dirección debe ser un string' }),
    (0, class_validator_1.MinLength)(3, { message: 'Dirección no debe ser menor a 3 caracteres' }),
    (0, class_validator_1.MaxLength)(80, { message: 'Dirección no debe ser mayor a 80 caracteres' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe de contener entre 5 y 20 caracteres',
        example: 'Test Country',
    }),
    (0, class_validator_1.IsString)({ message: 'País debe ser un string' }),
    (0, class_validator_1.MinLength)(5, { message: 'País no debe ser menor a 5 caracteres' }),
    (0, class_validator_1.MaxLength)(20, { message: 'País no debe ser mayor a 20 caracteres' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Debe de contener entre 5 y 20 caracteres',
        example: 'Test City',
    }),
    (0, class_validator_1.IsString)({ message: 'Ciudad debe ser un string' }),
    (0, class_validator_1.MinLength)(5, { message: 'Ciudad no debe ser menor a 5 caracteres' }),
    (0, class_validator_1.MaxLength)(20, { message: 'Ciudad no debe ser mayor a 20 caracteres' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, class_validator_1.IsEmpty)({ message: 'isAdmin no puede ser configurado en la creación' }),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isAdmin", void 0);
//# sourceMappingURL=CreateUser.dto.js.map