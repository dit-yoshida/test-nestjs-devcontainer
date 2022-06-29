import { IsNumberString } from 'class-validator';

export class PublishPostDto {
  @IsNumberString()
  id: number;
}
