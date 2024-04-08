import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { StaffService } from 'src/staff/staff.service';
import { UserService } from 'src/user/user.service';
import {
  SignInDto,
  SignInUserDto,
  SignUpDto,
  SignUpUserDto,
} from './dto/auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private staffService: StaffService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async signUp(dto: SignUpDto) {
    const staff = await this.staffService.create(dto);
    return {
      ...staff.toObject(),
      token: await this.jwtService.signAsync({ _id: staff._id }),
    };
  }
  async signIn(dto: SignInDto) {
    const staff = await this.staffService.findOneByQuery({
      email: dto.email,
      removed: false,
    });
    if (!staff || !(await bcrypt.compare(dto.pin, staff.pin))) {
      throw new NotFoundException();
    }
    return {
      ...staff.toObject(),
      token: await this.jwtService.signAsync({ _id: staff._id }),
    };
  }
  async signUpUser(dto: SignUpUserDto) {
    const user = await this.userService.create(dto);
    return {
      ...user.toObject(),
      token: await this.jwtService.signAsync({ _id: user._id }),
    };
  }
  async signInUser(dto: SignInUserDto) {
    const user = await this.userService.findOneByQuery({
      email: dto.email.trim().toLowerCase(),
      removed: false,
    });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new NotFoundException();
    }
    return {
      ...user.toObject(),
      token: await this.jwtService.signAsync({ _id: user._id }),
    };
  }
  validate(id: string) {
    return this.staffService.findOneByQuery({ _id: id, removed: false });
  }

  validateUser(id: string) {
    return this.userService.findOneByQuery({ _id: id, removed: false });
  }
}
