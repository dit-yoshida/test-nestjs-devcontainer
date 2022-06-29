import { IsString } from 'class-validator';

export class GetFilteredPostsDto {
  @IsString()
  searchString: string;
}
