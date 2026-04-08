import { CreateUserDto } from './CreateUser.dto';
declare const LoginUserDto_base: import("@nestjs/mapped-types").MappedType<Pick<CreateUserDto, "email" | "password">>;
export declare class LoginUserDto extends LoginUserDto_base {
}
export {};
