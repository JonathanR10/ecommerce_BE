import {
  IsEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmpty({ message: 'Email no es un parametro editable' })
  email?: string;

  @IsEmpty({ message: 'Id no es un parametro editable' })
  id?: string;

  @IsOptional()
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
  password?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Telefono no puede ir vacio' })
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    { message: 'Telefono debe de ser un numero valido' },
  )
  phone?: number;

  @IsOptional()
  @IsNotEmpty({ message: 'El nombre no puede ir vacío' })
  @IsString({ message: 'El nombre debe de ser un string' })
  @MinLength(3, { message: 'El nombre de al menos 3 caractres' })
  @MaxLength(80, { message: 'El nombre de no mas de 80 caracteres' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Dirección debe ser un string' })
  @MinLength(3, { message: 'Dirección no debe ser menor a 3 caracteres' })
  @MaxLength(80, { message: 'Dirección no debe ser mayor a 80 caracteres' })
  address?: string;

  @IsOptional()
  @IsString({ message: 'País debe ser un string' })
  @MinLength(5, { message: 'País no debe ser menor a 5 caracteres' })
  @MaxLength(20, { message: 'País no debe ser mayor a 20 caracteres' })
  country?: string;

  @IsOptional()
  @IsString({ message: 'Ciudad debe ser un string' })
  @MinLength(5, { message: 'Ciudad no debe ser menor a 5 caracteres' })
  @MaxLength(20, { message: 'Ciudad no debe ser mayor a 20 caracteres' })
  city?: string;
}
