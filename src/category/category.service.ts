import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { Category, CategoryDocument } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const existCategory = await this.categoryModel.findOne({
      name: createCategoryDto.name,
      removed: false,
    });
    if (existCategory) {
      throw new BadRequestException();
    }
    return this.categoryModel.create(createCategoryDto);
  }

  findAll() {
    return this.categoryModel.find({ removed: false });
  }

  findOne(id: string) {
    return this.categoryModel.findById(id);
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto);
  }

  remove(id: string) {
    return this.categoryModel.findByIdAndUpdate(id, { removed: true });
  }
}
