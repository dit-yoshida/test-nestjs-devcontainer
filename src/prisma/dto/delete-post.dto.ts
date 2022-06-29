import { IsNumberString } from 'class-validator';

export class DeletePostDto {
  @IsNumberString()
  id: number;
}
