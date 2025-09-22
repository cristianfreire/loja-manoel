import { Module } from '@nestjs/common';
import { PedidosModule } from './pedidos/pedidos.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  imports: [
    PedidosModule, 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // assim não precisa importar ConfigModule em outros módulos
    }),],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
