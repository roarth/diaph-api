import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.register(authCredentialsDto);
  }

  @Post('/login')
  login(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{
    accessToken: string;
  }> {
    return this.authService.login(authCredentialsDto);
  }
}
