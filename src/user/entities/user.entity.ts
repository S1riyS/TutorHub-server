import { $Enums, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class UserEntity implements User {
  @ApiProperty({ example: '220e47eb-0198-48b2-a401-1b5c1b34fe7b' })
  id: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'test@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
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
  @ApiProperty()
  imageLink: string | null;

  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty({ example: '+78005553535' })
  phoneNumber: string;

  @IsNotEmpty()
  @IsEnum($Enums.Role)
  @ApiProperty({ example: $Enums.Role.TUTOR, enum: $Enums.Role })
  role: $Enums.Role;
}
