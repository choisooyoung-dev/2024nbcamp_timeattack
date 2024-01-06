import { PickType } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class SignUpDto extends PickType(User, [
  'email',
  'nickname',
  'password',
]) {
  @IsNotEmpty({ message: '비밀번호 확인을 입력해주세요.' })
  @IsStrongPassword(
    { minLength: 6 },
    {
      message:
        '비밀번호는 최소 6자 이상, 영문, 알파벳, 대, 소문자, 특수문자(!@#$%^&*)를 포함해야합니다.',
    },
  )
  passwordConfirm: string;
}
