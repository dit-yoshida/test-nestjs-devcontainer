import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PrismaController } from './prisma.controller';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [PrismaController],
  providers: [UserService, PostService, PrismaService],
})
export class PrismaModule {}
