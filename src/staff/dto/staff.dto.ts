import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateStaffDto {
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
  @IsEmail()
  @ApiProperty({ type: String, required: true })
  email: string;
  @IsString()
  @Length(4, 4)
  @ApiProperty({ type: String, required: true })
  pin: string;
}

export class UpdateStaffDto extends PartialType(CreateStaffDto) {}
