"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const CreateUser_dto_1 = require("./CreateUser.dto");
class LoginUserDto extends (0, mapped_types_1.PickType)(CreateUser_dto_1.CreateUserDto, [
    'email',
    'password',
]) {
}
exports.LoginUserDto = LoginUserDto;
//# sourceMappingURL=LoginUser.dto.js.map