import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { User as UserModel, Post as PostModel } from '@prisma/client';
import { UserService } from './user.service';
import { PostService } from './post.service';
import { HttpExceptionFilter, PrismaErrorFilter } from '../common/filters';
import {
  CreateDraftDto,
  SignupUserDto,
  PublishPostDto,
  DeletePostDto,
  GetFilteredPostsDto,
  GetPostByIdDto,
} from './dto';

@Controller('prisma')
@UseFilters(HttpExceptionFilter, PrismaErrorFilter)
export class PrismaController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Get('post/:id')
  async getPostById(@Param() params: GetPostByIdDto): Promise<PostModel> {
    const { id } = params;
    return this.postService.post({ id: id });
  }

  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    });
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param() params: GetFilteredPostsDto,
  ): Promise<PostModel[]> {
    const { searchString } = params;
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('post')
  async createDraft(@Body() postData: CreateDraftDto): Promise<PostModel> {
    const { title, content, authorEmail } = postData;
    return this.postService.createPost({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Post('user')
  async signupUser(@Body() userData: SignupUserDto): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('publish/:id')
  async publishPost(@Param() params: PublishPostDto): Promise<PostModel> {
    const { id } = params;
    return this.postService.updatePost({
      where: { id },
      data: { published: true },
    });
  }

  @Delete('post/:id')
  async deletePost(@Param() params: DeletePostDto): Promise<PostModel> {
    const { id } = params;
    return this.postService.deletePost({ id });
  }
}
