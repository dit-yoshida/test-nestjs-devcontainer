import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostService } from './services/prisma/post.service';
import { PrismaService } from './services/prisma/prisma.service';
import { UserService } from './services/prisma/user.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UserService, PostService, PrismaService],
})
export class AppModule {}
