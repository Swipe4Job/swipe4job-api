import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';
import { ApplicationLogger } from './shared/infrastructure/services/application-logger/application-logger';
import { ValidationPipe } from '@nestjs/common';
import { HttpApplicationErrorsFilter } from './core/filter/http-application-errors.filter';
import { SerializerResponseInterceptorInterceptor } from './core/serializer-response-interceptor.interceptor';
import { HttpAllErrorsFilter } from './core/filter/http-all-errors.filter';
import helmet from 'helmet';
import { EnvironmentService } from './shared/infrastructure/services/environment/environment.service';
import { TransformInterceptor } from './core/transform/transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Set app logger
  const logger = app.get(ApplicationLogger);
  app.useLogger(logger);
  const environment = app.get(EnvironmentService);

  const allowedOrigins = ['https://zertiair-app.zertifier.com'];
  if (environment.ENV.ENVIRONMENT === 'development') {
    allowedOrigins.push('http://localhost:4200');
  }
  app.enableCors({
    origin: allowedOrigins,
  });
  app.use(helmet());

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

  app.useGlobalInterceptors(new TransformInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Zertiair')
    .setDescription('Zertiair API description')
    .setVersion('2.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // Start application and log info
  const port = environment.ENV.PORT;
  await app.listen(port);
  logger.log(`Listening on port ${port}`);
}

bootstrap();
