import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStaffDto, UpdateStaffDto } from './dto/staff.dto';
import { Staff, StaffDocument } from './entities/staff.entity';
@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff.name) private staffModel: Model<StaffDocument>,
  ) {}
  async create(createStaffDto: CreateStaffDto) {
    const existOne = await this.staffModel.findOne({
      email: createStaffDto.email.trim().toLowerCase(),
      removed: false,
    });
    if (existOne) {
      throw new BadRequestException();
    }
    return this.staffModel.create({
      ...createStaffDto,
      email: createStaffDto.email.trim().toLowerCase(),
    });
  }

  findAll() {
    return this.staffModel.find();
  }

  findOne(id: string) {
    return this.staffModel.findById(id);
  }
  //BUG: email validation
  async update(id: string, updateStaffDto: UpdateStaffDto) {
    return this.staffModel.findByIdAndUpdate(id, updateStaffDto);
  }

  remove(id: string) {
    return this.staffModel.findByIdAndUpdate(
      id,
      { removed: true },
      { new: true },
    );
  }

  findOneByQuery(query: any) {
    return this.staffModel.findOne(query);
  }
}
