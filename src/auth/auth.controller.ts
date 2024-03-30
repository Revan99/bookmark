import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() dto: AuthDto): Promise<{ access_token: string }> {
    return this.authService.login(dto);
  }

  @Post('signup')
  async signup(@Body() dto: AuthDto): Promise<{ msg: string }> {
    return this.authService.signup(dto);
  }
}
