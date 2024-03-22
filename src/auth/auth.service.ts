import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { StaffService } from 'src/staff/staff.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private staffService: StaffService,
    private jwtService: JwtService,
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

  validate(id: string) {
    return this.staffService.findOneByQuery({ _id: id, removed: false });
  }
}
