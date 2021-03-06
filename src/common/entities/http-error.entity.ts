import { ApiProperty } from '@nestjs/swagger';

export class HttpErrorEntity {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string | string[];

  @ApiProperty()
  error: string;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  path: string;
}
