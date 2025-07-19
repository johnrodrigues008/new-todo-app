import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: `http://localhost:${process.env.PORTORIGINCORS ?? 3000}`,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  /* 
    const allowedOrigins = process.env.NODE_ENV === 'production'
    ? ['https://meusite.com']
    : ['http://localhost:3000'];

    app.enableCors({
      origin: allowedOrigins,
      credentials: true,
    });

  */

  const config = new DocumentBuilder()
    .setTitle('Minha todo App API')
    .setDescription('API para o funcionamento do meu To do List.')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
