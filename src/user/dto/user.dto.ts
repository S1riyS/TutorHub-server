import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { $Enums } from '@prisma/client';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'test@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @ApiProperty({ example: 'super_secret_password' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Петров' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Иван' })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Викторович' })
  middleName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  imageLink: string | null;

  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty({ example: '+78005553535' })
  phoneNumber: string;

  @IsNotEmpty()
  @IsEnum($Enums.Role)
  @ApiProperty({ example: $Enums.Role.TUTOR })
  role: $Enums.Role;
}

// In UpdateUserDTO fields 'email', 'password', 'role' are omitted, others are optional
export class UpdateUserDTO extends PartialType(OmitType(CreateUserDTO, ['email', 'password', 'role'] as const)) {}
