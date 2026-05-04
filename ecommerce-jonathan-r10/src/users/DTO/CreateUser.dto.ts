import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  Max,
  MaxLength,
  Min,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Debe ser una cadena de texto de entre 3 y 80 caracteres',
    example: 'Test User 001',
  })
  @IsNotEmpty({ message: 'El nombre no puede ir vacío' })
  @IsString({ message: 'El nombre debe de ser un string' })
  @MinLength(3, { message: 'El nombre de al menos 3 caractres' })
  @MaxLength(80, { message: 'El nombre de no mas de 80 caracteres' })
  name!: string;

  @ApiProperty({
    description: 'Debe de ser un correo electronico con formato valido',
    example: 'testuser001@email.com',
  })
  @IsNotEmpty({ message: 'El email no puede ir vacío' })
  @IsEmail({}, { message: 'El email debe de tener un formato válido' })
  email!: string;

  @ApiProperty({
    description:
      'La contraseña debe contener al menos 1 minuscula, 1 mayuscula, 1 numero y 1 simbolo. La longitud es entre 8 y 15 caracteres',
    example: 'aaBB33##',
  })
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

  @ApiProperty({
    description: 'Debe ser igual a la contraseña',
    example: 'aaBB33##',
  })
  @IsNotEmpty({ message: 'La confirmación de la contraseña no puede ir vacia' })
  @Validate(MatchPassword, ['password'])
  confirmPassword!: string;

  @ApiProperty({
    description:
      'Debe de ser un numero valido y no puede ir vacio. Longitud de 9 digitos',
    example: '551234567',
  })
  @IsNotEmpty({ message: 'Telefono no puede ir vacio' })
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    { message: 'Telefono debe de ser un numero valido' },
  )
  @Min(100000000, { message: 'Longitud debe de ser 9 digitos exactamente' })
  @Max(999999999, { message: 'Longitud debe de ser 9 digitos exactamente' })
  phone!: number;

  @ApiProperty({
    description: 'Debe de contener entre 3 y 80 caracteres.',
    example: 'Test Street #1 main Ave.',
  })
  @IsString({ message: 'Dirección debe ser un string' })
  @MinLength(3, { message: 'Dirección no debe ser menor a 3 caracteres' })
  @MaxLength(80, { message: 'Dirección no debe ser mayor a 80 caracteres' })
  address!: string;

  @ApiProperty({
    description: 'Debe de contener entre 5 y 20 caracteres',
    example: 'Test Country',
  })
  @IsString({ message: 'País debe ser un string' })
  @MinLength(5, { message: 'País no debe ser menor a 5 caracteres' })
  @MaxLength(20, { message: 'País no debe ser mayor a 20 caracteres' })
  country!: string;

  @ApiProperty({
    description: 'Debe de contener entre 5 y 20 caracteres',
    example: 'Test City',
  })
  @IsString({ message: 'Ciudad debe ser un string' })
  @MinLength(5, { message: 'Ciudad no debe ser menor a 5 caracteres' })
  @MaxLength(20, { message: 'Ciudad no debe ser mayor a 20 caracteres' })
  city!: string;

  @ApiHideProperty()
  @IsEmpty({ message: 'isAdmin no puede ser configurado en la creación' })
  isAdmin!: boolean;
}
