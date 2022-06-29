import { IsNumberString } from 'class-validator';

export class GetPostByIdDto {
  @IsNumberString()
  id: number;
}
