import { ZodValidationPipe } from '@abitia/zod-dto';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT', 8000);
  const corsOrigin = configService.get<string>('CORS_ORIGIN', 'http://localhost:3000');

  console.log(`Server is starting on port: ${port}`);

  app.enableCors({
    origin: corsOrigin,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });

  app.useGlobalPipes(new ZodValidationPipe());

  await app.listen(port);

  console.log(`Server is running on http://localhost:${port}`);
};

bootstrap();
