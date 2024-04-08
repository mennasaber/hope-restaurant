import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { Role } from '../enums/role.enum';

export class SignInDto {
  @IsEmail()
  @ApiProperty({ type: String, required: true })
  email: string;
  @IsString()
  @Length(4, 4)
  @ApiProperty({ type: String, minLength: 4, maxLength: 4 })
  pin: string;
}

export class SignUpDto extends SignInDto {
  @IsString()
  @ApiProperty({ type: String, required: true })
  firstName: string;
  @IsString()
  @ApiProperty({ type: String, required: true })
  lastName: string;
  @IsString()
  @Length(11, 11)
  @ApiProperty({ type: String, required: true, minLength: 11, maxLength: 11 })
  phoneNumber: string;
  @IsEnum(Role)
  @ApiProperty({ type: String, enum: Role })
  role: string;
}

export class SignInUserDto {
  @IsEmail()
  @ApiProperty({ type: String, required: true })
  email: string;
  @IsString()
  @ApiProperty({ type: String, required: true })
  password: string;
}
export class SignUpUserDto extends SignInUserDto {
  @IsString()
  @ApiProperty({ type: String, required: true })
  name: string;
  @IsString()
  @ApiProperty({ type: String, required: true })
  phoneNumber: string;
}
