import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() signUpDto: SignUpDto) {
    const { email, nickname, password, passwordConfirm } = signUpDto;
    const data = await this.authService.signUp(
      email,
      nickname,
      password,
      passwordConfirm,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: '회원가입에 성공했습니다.',
      data,
    };
  }
}
