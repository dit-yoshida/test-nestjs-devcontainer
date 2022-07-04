import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class DeletePostDto {
  @IsNumberString()
  @ApiProperty()
  id: string;
}
