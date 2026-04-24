import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class MatchPassword implements ValidatorConstraintInterface {
    validate(confirmPassword: string, args?: ValidationArguments): Promise<boolean> | boolean;
    defaultMessage(validationArguments?: ValidationArguments): string;
}
