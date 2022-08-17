import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './controlleR/todo.controller';
import { Todo } from './entities/todo.entity';
import { TodoService } from './services/todo.service';
//import { config } from './orm.config';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
