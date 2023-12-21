import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';
import { ApplicationLogger } from './shared/infrastructure/services/application-logger/application-logger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { HttpApplicationErrorsFilter } from './core/http-application-errors.filter';
import { SerializerResponseInterceptorInterceptor } from './core/serializer-response-interceptor.interceptor';
import { HttpAllErrorsFilter } from './core/http-all-errors.filter';
import helmet from 'helmet';
import { EnvironmentService } from './shared/infrastructure/services/environment/environment.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.enableCors({
    origin: ['https://zertiair-app.zertifier.com'],
  });
  app.use(helmet());

  // Set app logger
  const logger = app.get(ApplicationLogger);
  app.useLogger(logger);

  const environment = app.get(EnvironmentService);

  // Note the order of the filters is important
  // the filters are saved in a stack. That means that
  // the last inserted filter will be the first filter
  // to be checked and executed
  app.useGlobalFilters(
    new HttpAllErrorsFilter(logger),
    new HttpApplicationErrorsFilter(logger),
  );
  app.useGlobalInterceptors(new SerializerResponseInterceptorInterceptor());

  // Set validations
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // Start application and log info
  const port = environment.ENV.PORT;
  await app.listen(port);
  logger.log(`Listening on port ${port}`);
}

bootstrap();
