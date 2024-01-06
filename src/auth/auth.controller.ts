import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Request,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SignInDto } from './dto/sign-in.dto';
@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 회원가입
   * @param signUpDto
   * @returns
   */
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
  /**
   * 로그인
   * @param req
   * @param signInDto
   * @returns
   */
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('/sign-in')
  async signIn(@Request() req, @Body() signInDto: SignInDto) {
    const data = await this.authService.signIn(req.user.id);

    return { statsCode: HttpStatus.OK, message: '로그인 성공', data };
  }
}
