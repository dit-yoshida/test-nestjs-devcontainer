import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class PublishPostDto {
  @IsNumberString()
  @ApiProperty()
  id: string;
}
