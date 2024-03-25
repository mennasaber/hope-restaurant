import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { User } from 'src/auth/decorators/user.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { UserJwtAuthGuard } from 'src/auth/guards/user-jwt-auth.guard';
import { UpdateUserDto } from './dto/user.dto';
import { UserDocument } from './entities/user.entity';
import { UserService } from './user.service';
@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch()
  @UseGuards(UserJwtAuthGuard)
  update(@User() user: UserDocument, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user, updateUserDto);
  }

  @Delete()
  @UseGuards(UserJwtAuthGuard)
  remove(@User() user: UserDocument) {
    return this.userService.remove(user);
  }
}
