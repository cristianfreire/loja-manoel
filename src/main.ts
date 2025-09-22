import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config_env = app.get(ConfigService);
  const port = config_env.get<number>('PORT') || 3000;

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: false
  }));

  const config = new DocumentBuilder()
    .setTitle('API Loja Manoel')
    .setDescription('API para empacotamento de pedidos')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token', // nome da segurança que será usada nos endpoints
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(port);
  console.log(`Servidor rodando na porta ${port}`);

}
bootstrap();
