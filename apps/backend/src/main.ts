// src/main.ts

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const whitelist = process.env.NODE_ENV === 'production'
    ? [
        'https://frontend-xi-two-20.vercel.app',
        'https://new-todo-app-f1iq.onrender.com', 
        'https://frontend-johnrodrigues008s-projects.vercel.app/'           
      ]
    : [
        `http://localhost:${process.env.PORTORIGINCORS ?? 3000}`,
        'https://frontend-xi-two-20.vercel.app',
        'https://frontend-johnrodrigues008s-projects.vercel.app/'
      ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: Origem ${origin} não permitida`));
      }
    },
    credentials: true,
    methods: ['GET','HEAD','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Minha todo App API')
    .setDescription('API para o funcionamento do meu To do List.')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory);

  // Inicia o servidor
  const port = process.env.PORT ? Number(process.env.PORT) : 4000;
  await app.listen(port);
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
}

bootstrap();
