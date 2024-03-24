import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';
import { Item, ItemDocument } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}
  async create(createItemDto: CreateItemDto) {
    const existItem = await this.itemModel.findOne({
      name: createItemDto.name,
      removed: false,
    });
    if (existItem) {
      throw new BadRequestException();
    }
    return this.itemModel.create(createItemDto);
  }

  findAll() {
    return this.itemModel.find({ removed: false });
  }

  findOne(id: string) {
    return this.itemModel.findById(id);
  }

  update(id: string, updateItemDto: UpdateItemDto) {
    return this.itemModel.findByIdAndUpdate(id, updateItemDto);
  }

  remove(id: string) {
    return this.itemModel.findByIdAndUpdate(id, { removed: true });
  }
}
