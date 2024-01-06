import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
  @IsString()
  @Column()
  nickname: string;

  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  @IsStrongPassword(
    { minLength: 6 },
    {
      message:
        '비밀번호는 최소 6자 이상, 영문, 알파벳, 대, 소문자, 특수문자(!@#$%^&*)를 포함해야합니다.',
    },
  )
  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
