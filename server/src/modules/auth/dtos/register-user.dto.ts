import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @Length(2, 30)
  firstName: string;

  @IsString()
  @Length(2, 30)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 20)
  password: string;
}