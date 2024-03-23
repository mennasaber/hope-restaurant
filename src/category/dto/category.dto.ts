import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @ApiProperty({ type: String, required: true })
  name: string;
  @IsOptional()
  @IsBoolean()
  @ApiProperty({ type: Boolean, required: false })
  display: boolean;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
