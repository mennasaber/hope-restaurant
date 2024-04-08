import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @ApiProperty({ type: String, required: true })
  name: string;
  @IsString()
  @ApiProperty({ type: String, required: true })
  email: string;
  @IsString()
  @ApiProperty({ type: String, required: true })
  phoneNumber: string;
  @IsString()
  @ApiProperty({ type: String, required: true })
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
