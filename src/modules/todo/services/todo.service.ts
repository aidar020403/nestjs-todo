import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOneBy({ id });
  }

  create(todo: Todo): Promise<Todo> {
    delete todo.id;
    return this.todoRepository.save(todo);
  }

  update(todo: Todo): Promise<Todo> {
    return this.todoRepository.save(todo);
  }

  async remove(id: string): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
