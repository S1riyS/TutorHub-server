import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { $Enums } from '@prisma/client';
import { OmitType, PartialType } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  middleName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  imageLink: string | null;

  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEnum($Enums.Role)
  role: $Enums.Role;
}

// In UpdateUserDTO fields 'email', 'password', 'role' are omitted, others are optional
export class UpdateUserDTO extends PartialType(OmitType(CreateUserDTO, ['email', 'password', 'role'] as const)) {}
