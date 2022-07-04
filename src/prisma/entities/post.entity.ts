import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Post } from '@prisma/client';

export class PostEntity implements Post {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional({ nullable: true })
  content: string | null;

  @ApiPropertyOptional({ nullable: true, default: false })
  published: boolean | null;

  @ApiPropertyOptional({ nullable: true })
  authorId: number | null;
}
