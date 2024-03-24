import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateItemDto {
  @IsString()
  @ApiProperty({ type: String, required: true })
  name: string;
  @IsString()
  @ApiProperty({ type: String })
  discription: string;
  @IsNumber()
  @Min(0)
  @ApiProperty({ type: Number, required: true, minimum: 0 })
  price: number;
  @Min(0)
  @Max(100)
  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, minimum: 0, maximum: 100 })
  discount: number;
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: Boolean })
  display: boolean;
  @IsMongoId()
  @ApiProperty({
    type: String,
    required: true,
  })
  category: string;
}

export class UpdateItemDto extends PartialType(CreateItemDto) {}
