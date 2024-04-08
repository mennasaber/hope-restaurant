import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Roles } from './decorators/roles.decorator';
import {
  SignInDto,
  SignInUserDto,
  SignUpDto,
  SignUpUserDto,
} from './dto/auth.dto';
import { Role } from './enums/role.enum';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RoleGuard } from './guards/role.guard';
@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('user/sign-up')
  createUser(@Body() createUserDto: SignUpUserDto) {
    return this.authService.signUpUser(createUserDto);
  }

  @Post('user/sign-in')
  signInUser(@Body() dto: SignInUserDto) {
    return this.authService.signInUser(dto);
  }

  @Post('sign-up')
  @Roles(Role.SuperAdmin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  create(@Body() createStaffDto: SignUpDto) {
    return this.authService.signUp(createStaffDto);
  }

  @Post('sign-in')
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }
}
