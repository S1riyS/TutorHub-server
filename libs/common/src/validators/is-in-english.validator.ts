import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
class UserExistsRule implements ValidatorConstraintInterface {
  private readonly englishRegExp = /^[A-Za-z0-9]*$/;

  async validate(value: string) {
    return this.englishRegExp.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be in English`;
  }
}

export function IsInEnglish(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsInEnglish',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserExistsRule,
    });
  };
}
