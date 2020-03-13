import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationFilter } from './filters/validation.filter';
// import { HttpExceptionFilter } from './filters/httpException.filter';
import { FallbackExceptionFilter } from './filters/fallback.filter';
import { ValidationPipe, ValidationError } from '@nestjs/common';
import { ValidationException } from './filters/validation.exception';
import * as dotenv from 'dotenv';

if (process.env.Nest_Env !== "Production") dotenv.config();

const port = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    //new HttpExceptionFilter(),
    //new ValidationFilter()
  );
  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: true,
    exceptionFactory: (errors: ValidationError[]) => {
      const messages = errors.map(
        error => `${error.property} has a wrong value ${error.value},
        ${Object.values(error.constraints).join(', ')}`
      )

      return new ValidationException(messages)
    }
  }));
  
  await app.listen(port);
  console.log(`Server initialized on port ${port}`);
}
bootstrap();
