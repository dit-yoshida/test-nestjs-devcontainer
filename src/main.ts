import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedocModule, RedocOptions } from 'nestjs-redoc';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Test NestJS DevContainer API')
    .setDescription('The Test NestJS DevContainer API description')
    .setVersion('1.0')
    .addTag('prisma')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const redocOptions: RedocOptions = {
    title: 'Test NestJS DevContainer API',
    // logo: {
    //   url: 'https://redocly.github.io/redoc/petstore-logo.png',
    //   backgroundColor: '#F0F0F0',
    //   altText: 'PetStore logo',
    // },
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
    // auth: {
    //   enabled: true,
    //   user: 'admin',
    //   password: '123',
    // },
    tagGroups: [
      {
        name: 'Samples',
        tags: ['app'],
      },
      {
        name: 'Core resources',
        tags: ['prisma'],
      },
    ],
  };
  // Instead of using SwaggerModule.setup() you call this module
  await RedocModule.setup('/docs', app, document, redocOptions);

  await app.listen(3000);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}
bootstrap();
