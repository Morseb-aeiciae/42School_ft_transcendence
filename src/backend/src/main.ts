import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
 app.enableCors({
    credentials: true,
    origin: "http://" + process.env.FRONTEND,
    allowedHeaders: 'authorization, access-control-allow-credentials, access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,access-control-max-age,Content-type,withcredentials',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  // app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
