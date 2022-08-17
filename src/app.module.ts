import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
