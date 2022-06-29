import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignupUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
