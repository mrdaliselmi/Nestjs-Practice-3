/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo';
import { TodoStatusEnum } from './todo-status.enum';
import { AddTodoDto } from './dto/addtodo.dto';
import { UpdateTodoDto } from './dto/updatetodo.dto';
import { TodoEntity } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { SearchTodoDto } from './dto/searchtodo.dto';
import { stat } from 'fs';
import { UserEntity } from '../user/entities/user.entity';
import { UserRole } from '../common/user-role.enum';

@Injectable()
export class TodoService {
  todos: Todo[] = [];

  constructor(@Inject('uuid') private readonly uuid,
  @InjectRepository(TodoEntity)
  private todoRepository : Repository<TodoEntity>) {}

  // getAllTodos(): Todo[] {
  //   return this.todos;
  // }


  // getTodoById(id: string): Todo {
  //   const todo = this.todos.find((actualTodo) => actualTodo.id === id);
  //   if (todo) return todo;
  //   throw new NotFoundException(`todo of id ${id} not found`);
  // }


    // addTodo(newTodo: AddTodoDto): Todo {
  //   const {name, description} = newTodo;
  //   const id = this.uuid();
  //   const todo = {
  //     id,
  //     name,
  //     description,
  //     createdAt: new Date(),
  //     status: TodoStatusEnum.waiting,
  //   };
  //   this.todos.push(todo);
  //   return todo;
  // }

  
  // updateTodoById(id: string, newTodo: Partial<UpdateTodoDto>) {
  //   const todo = this.getTodoById(id);
  //   todo.description = newTodo.description ??newTodo.description;
  //   todo.name = newTodo.name ? newTodo.name : todo.name;
  //   todo.status = newTodo.status ? newTodo.status : todo.status;
  //   return todo;
  // }

  // deleteTodoById(id: string){
  //   const todo = this.getTodoById(id);
  //   if (todo) {
  //     this.todos = this.todos.filter((todo) => todo.id !== id);
  //   }
  //   return {
  //       message : `todo of id ${id} is deleted`,
  //       count: 1
  //     };
  // }
  
  async getAllTodosV2(){
    return await this.todoRepository.find();
  }

  async getAllTodosPaginated(page = 1, limit = 10) {
    const [todos, total] = await this.todoRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return todos;
  }

  async getTodoByIdV2(id: number){
    const todo = await this.todoRepository.findOne({where : {"id" : id}});
    if(!todo) throw new NotFoundException(`todo of id ${id} not found`);
    return todo;
  }

  async addTodoV2(newTodo: AddTodoDto, userId: number){
    const todo = this.todoRepository.create({
      ...newTodo,
      userId
    });
    return await this.todoRepository.save(todo);
  }

  async softDeleteTodoById(id: number, userId: number){
    const todo = await this.todoRepository.findOne({where : {"id" : id}});
    if(!todo) throw new NotFoundException(`todo of id ${id} not found`);
    if(todo.userId !== userId){
      throw new NotFoundException(`le todo d'id ${id} n'appartient pas à l'utilisateur ${userId}`)
    }
    return await this.todoRepository.softDelete(id);
  }

  async restoreTodoById(id: number){
    return await this.todoRepository.restore(id);
  }  

  async updateTodoByIdV2(id:number, todo: UpdateTodoDto, userId: number){
    const newTodo=await this.todoRepository.preload({
      id,
      ...todo
      })
    if(!newTodo){
      throw new NotFoundException(`le todo d'id {$id} n'existe pas`)
    }
    if(newTodo.userId !== userId){
      throw new NotFoundException(`le todo d'id ${id} n'appartient pas à l'utilisateur ${userId}`)
    }else{
      return await this.todoRepository.save(newTodo);
    }
  }

  async countTodoByStatus(user : UserEntity){
         if(user.role === UserRole.ADMIN){
      const actif = await this.todoRepository.count({where : {status : TodoStatusEnum.actif}});
      const waiting = await this.todoRepository.count({where : {status : TodoStatusEnum.waiting}});
      const done = await this.todoRepository.count({where : {status : TodoStatusEnum.done}});
      return {"actif": actif,"waiting": waiting,"done": done};
         }
    }
  

  async countTodo() {
    const counts = {} ;
    const statuses = Object.values(TodoStatusEnum) ;
    for(const status of statuses){
        counts[status] = await this.todoRepository.count({where : {status : status}}) ;
    }
    return counts ;
  }

  // async searchTodo(param: SearchTodoDto){
  //   if(param.status || param.criteria)
  //     return this.todoRepository.find(
  //       {where : [{status : param.status},
  //                 {name : Like(`%${param.criteria}%`)},
  //                 {description: Like(`%${param.criteria}%`)}]},) ;
  //   return this.todoRepository.find() ;
  // }

  async searchTodo(param: SearchTodoDto){
  const {status, criteria} = param;
  if(!status && !criteria) {
    return await this.todoRepository.find();
    }
  else if(status || criteria ) {
    const NameQuery = Like(`%${param.criteria}%`);
    const descriptionQuery = Like(`%${param.criteria}%`);
    const StatusQuery = status;
    return await this.todoRepository.find({
      where : [{name: NameQuery , status: StatusQuery}
      ,{description: descriptionQuery, status:StatusQuery}]
    })
    }
  }

  async getAllTodosByUserId(userId: number){
    return await this.todoRepository.find({where : {userId : userId}});
  }


}
