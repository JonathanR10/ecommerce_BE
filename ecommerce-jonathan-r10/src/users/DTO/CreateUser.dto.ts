import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre no puede ir vacío' })
  @IsString({ message: 'El nombre debe de ser un string' })
  @MinLength(3, { message: 'El nombre de al menos 3 caractres' })
  @MaxLength(80, { message: 'El nombre de no mas de 80 caracteres' })
  name!: string;

  @IsNotEmpty({ message: 'El email no puede ir vacío' })
  @IsEmail({}, { message: 'El email debe de tener un formato válido' })
  email!: string;

  @IsNotEmpty({ message: 'Contraseña no puede ir vacía' })
  @IsString({ message: 'Contraseña debe ser un string' })
  @MinLength(8, { message: 'Contraseña no debe ser menor a 8 caracteres' })
  @MaxLength(15, { message: 'Contraseña no debe ser mayor a 15 caracteres' })
  @IsStrongPassword(
    {
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Contraseña debe contener al menos 1 minuscula, 1 mayuscula, 1 numero y 1 simbolo',
    },
  )
  password!: string;

  @IsNotEmpty({ message: 'La confirmación de la contraseña no puede ir vacia' })
  @Validate(MatchPassword, ['password'])
  confirmPassword!: string;

  @IsNotEmpty({ message: 'Telefono no puede ir vacio' })
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    { message: 'Telefono debe de ser un numero valido' },
  )
  phone!: number;

  @IsString({ message: 'Dirección debe ser un string' })
  @MinLength(3, { message: 'Dirección no debe ser menor a 3 caracteres' })
  @MaxLength(80, { message: 'Dirección no debe ser mayor a 80 caracteres' })
  address!: string;

  @IsString({ message: 'País debe ser un string' })
  @MinLength(5, { message: 'País no debe ser menor a 5 caracteres' })
  @MaxLength(20, { message: 'País no debe ser mayor a 20 caracteres' })
  country!: string;

  @IsString({ message: 'Ciudad debe ser un string' })
  @MinLength(5, { message: 'Ciudad no debe ser menor a 5 caracteres' })
  @MaxLength(20, { message: 'Ciudad no debe ser mayor a 20 caracteres' })
  city!: string;

  @IsEmpty({ message: 'isAdmin no puede ser configurado en la creación' })
  isAdmin!: boolean;
}
