import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

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
}
