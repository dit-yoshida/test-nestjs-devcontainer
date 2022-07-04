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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PostEntity } from './entities/post.entity';
import { HttpErrorEntity } from 'src/common/entities/http-error.entity';
import { UserEntity } from './entities/user.entity';

@Controller('prisma')
@ApiTags('prisma')
@ApiBadRequestResponse({
  type: HttpErrorEntity,
})
@UseFilters(HttpExceptionFilter, PrismaErrorFilter)
export class PrismaController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Get('post/:id')
  @ApiOperation({
    summary: '投稿取得',
    description: '投稿を取得する。',
  })
  @ApiOkResponse({
    type: PostEntity,
  })
  @ApiNotFoundResponse({
    type: HttpErrorEntity,
  })
  async getPostById(@Param() params: GetPostByIdDto): Promise<PostModel> {
    const { id } = params;
    return this.postService.post({ id: parseInt(id) });
  }

  @Get('feed')
  // TODO: @ApiOperation 記載
  @ApiOkResponse({
    type: Array<PostEntity>,
  })
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    });
  }

  @Get('filtered-posts/:searchString')
  // TODO: @ApiOperation 記載
  @ApiOkResponse({
    type: Array<PostEntity>,
  })
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
  // TODO: @ApiOperation 記載
  @ApiCreatedResponse({
    description: 'The draft has been successfully created.',
    type: PostEntity,
  })
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
  // TODO: @ApiOperation 記載
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: UserEntity,
  })
  async signupUser(@Body() userData: SignupUserDto): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('publish/:id')
  // TODO: @ApiOperation 記載
  @ApiOkResponse({
    description: 'The post has been successfully published.',
    type: PostEntity,
  })
  @ApiNotFoundResponse({
    type: HttpErrorEntity,
  })
  async publishPost(@Param() params: PublishPostDto): Promise<PostModel> {
    const { id } = params;
    return this.postService.updatePost({
      where: { id: parseInt(id) },
      data: { published: true },
    });
  }

  @Delete('post/:id')
  // TODO: @ApiOperation 記載
  @ApiOkResponse({
    description: 'The post has been successfully deleted.',
    type: PostEntity,
  })
  @ApiNotFoundResponse({
    type: HttpErrorEntity,
  })
  async deletePost(@Param() params: DeletePostDto): Promise<PostModel> {
    const { id } = params;
    return this.postService.deletePost({ id: parseInt(id) });
  }
}
