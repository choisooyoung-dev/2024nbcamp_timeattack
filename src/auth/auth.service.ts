import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signUp(email, nickname, password, passwordConfirm) {
    const isPasswordMatched = password === passwordConfirm;
    if (!isPasswordMatched) {
      throw new BadRequestException(
        '비밀번호와 비밀번호 확인이 서로 일치하지 않습니다.',
      );
    }

    const existedUser = await this.userRepository.findOneBy({ email });
    if (existedUser) {
      throw new BadRequestException('이미 가입된 이메일입니다.');
    }

    // 비밀번호 암호화
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const user = await this.userRepository.save({
      email,
      password: hashedPassword,
      nickname,
    });
    delete user.password;

    return user;
  }
}
