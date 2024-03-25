import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userModel.findOne({
      email: createUserDto.email.trim().toLowerCase(),
      removed: false,
    });
    if (existUser) throw new BadRequestException();
    return this.userModel.create({
      ...createUserDto,
      email: createUserDto.email.trim().toLowerCase(),
    });
  }

  findAll() {
    return this.userModel.find({ removed: false });
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  //BUG: email validation
  update(user: UserDocument, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ _id: user._id }, updateUserDto);
  }

  remove(user: UserDocument) {
    return this.userModel.findOneAndUpdate(
      { _id: user._id },
      { removed: true },
    );
  }

  findOneByQuery(query: any) {
    return this.userModel.findOne(query);
  }
}
