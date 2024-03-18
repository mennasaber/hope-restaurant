import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStaffDto, UpdateStaffDto } from './dto/staff.dto';
import { Staff, StaffDocument } from './entities/staff.entity';

@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff.name) private staffModel: Model<StaffDocument>,
  ) {}
  create(createStaffDto: CreateStaffDto) {
    return this.staffModel.create(createStaffDto);
  }

  findAll() {
    return this.staffModel.find();
  }

  findOne(id: string) {
    return this.staffModel.findById(id);
  }

  update(id: string, updateStaffDto: UpdateStaffDto) {
    return this.staffModel.findByIdAndUpdate(id, updateStaffDto, { new: true });
  }

  remove(id: string) {
    return this.staffModel.findByIdAndUpdate(
      id,
      { removed: true },
      { new: true },
    );
  }
}
