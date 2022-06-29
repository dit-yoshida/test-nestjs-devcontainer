import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDraftDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsNotEmpty()
  @IsEmail()
  authorEmail: string;
}
