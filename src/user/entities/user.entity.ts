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

  /**
   * 닉네임
   * @example "ex01"
   */
  @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
  @IsString()
  @Column()
  nickname: string;

  /**
   * 이메일
   * @example "ex01@gmail.com"
   */
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  @IsEmail()
  @Column({ unique: true })
  email: string;

  /**
   * 비밀번호
   * @example "eX12312345!!@"
   */
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

  @IsString()
  @Column({ nullable: true })
  refreshToken?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
