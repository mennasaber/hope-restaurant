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
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { UpdateStaffDto } from './dto/staff.dto';
import { Staff } from './entities/staff.entity';
import { StaffService } from './staff.service';
@ApiTags(Staff.name)
@Controller('staff')
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiBearerAuth()
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get()
  @Roles(Role.SuperAdmin, Role.Admin)
  findAll() {
    return this.staffService.findAll();
  }

  @Get(':id')
  @Roles(Role.SuperAdmin, Role.Admin)
  findOne(@Param('id') id: string) {
    return this.staffService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.SuperAdmin)
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(id, updateStaffDto);
  }

  @Delete(':id')
  @Roles(Role.SuperAdmin)
  remove(@Param('id') id: string) {
    return this.staffService.remove(id);
  }
}
