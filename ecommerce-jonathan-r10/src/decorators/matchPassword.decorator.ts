import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'matchPassword', async: false })
export class MatchPassword implements ValidatorConstraintInterface {
  validate(
    confirmPassword: string,
    args?: ValidationArguments,
  ): Promise<boolean> | boolean {
    const obj = args?.object as Record<string, unknown>;
    const key = args?.constraints[0];
    const password = obj[key];

    return password === confirmPassword;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'El password y la confirmación no coincide.';
  }
}
