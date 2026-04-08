import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './CreateUser.dto';

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
