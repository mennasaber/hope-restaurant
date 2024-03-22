import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Roles } from './decorators/roles.decorator';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { Role } from './enums/role.enum';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  @Roles(Role.SuperAdmin)
  @UseGuards(JwtAuthGuard)
  create(@Body() createStaffDto: SignUpDto) {
    return this.authService.signUp(createStaffDto);
  }

  @Post('sign-in')
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }
}
