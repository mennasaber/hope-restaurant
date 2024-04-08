import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async getMenu() {
    return this.categoryModel.aggregate([
      {
        $match: {
          removed: false,
          display: true,
        },
      },
      {
        $lookup: {
          from: 'items',
          localField: '_id',
          foreignField: 'category',
          pipeline: [
            {
              $match: {
                removed: false,
                display: true,
              },
            },
            {
              $project: {
                name: 1,
                discription: 1,
                price: 1,
                discount: 1,
              },
            },
          ],
          as: 'items',
        },
      },
      {
        $project: {
          name: 1,
          items: 1,
        },
      },
    ]);
  }
}
