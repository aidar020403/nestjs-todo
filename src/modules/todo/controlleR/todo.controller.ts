import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { TodoService } from '../services/todo.service';
import { CreateDto, UpdateDto } from './dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  getAllTodo(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  async getOneTodo(@Param('id') id: number): Promise<Todo> {
    const todo = this.todoService.findOne(id);
    if (todo === undefined) {
      throw new HttpException(
        'Todo with id=' + id + ' not exists',
        HttpStatus.NOT_FOUND,
      );
    }
    return todo;
  }

  @Post()
  createTodo(@Body() createDto: CreateDto): Promise<Todo> {
    const todo = new Todo();
    todo.title = createDto.title;
    if (createDto.isCompleted !== undefined) {
      todo.isCompleted = createDto.isCompleted;
    }
    return this.todoService.create(todo);
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: number,
    @Body() { title, isCompleted = false }: UpdateDto,
  ): Promise<Todo> {
    const todo = await this.todoService.findOne(id);
    if (todo === undefined) {
      throw new NotFoundException('Todo with id=' + id + ' not exists');
    }
    todo.title = title;
    todo.isCompleted = isCompleted;
    return this.todoService.update(todo);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string): Promise<void> {
    return this.todoService.remove(id);
  }
}
