/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Body, Delete, Patch, Param, Version, Query, ParseIntPipe, Req} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo';
import { AddTodoDto } from './dto/addtodo.dto';
import { UpdateTodoDto } from './dto/updatetodo.dto';
import { SearchTodoDto } from './dto/searchtodo.dto';
import { UserRole } from '../common/user-role.enum';
@Controller('todo')
export class TodoController {
    private todos = [];
    constructor(private todoService: TodoService) {}

    //search todo with typeorm
    @Get('/search')
    async searchTodo(@Query() param: SearchTodoDto){
        return await this.todoService.searchTodo(param);
    }

    // @Get("/all")
    // getAllTodos(): Todo[] {
    //     return this.todoService.getAllTodos();
    // }

    // get all todo with typeorm
    @Get('/all')
    async getAllTodosV2(
        @Req() req,
    ){
        const user = req['user'];
        if(user.role === UserRole.ADMIN)
        {
            return await this.todoService.getAllTodosV2();
        }else{
            return await this.todoService.getAllTodosByUserId(user.id);
        }
    }

    @Get('/all/paginated')
    async getAllTodosPaginated(
        @Query('page') page = 1,
        @Query('limit') limit = 10,) {
        return await this.todoService.getAllTodosPaginated(page, limit);
    }

    // @Post()
    // @Version('1')
    // addTodo(
    //     @Body() newTodo: AddTodoDto,
    // ): Todo {
    //     return (<Todo>this.todoService.addTodo(newTodo));
    // }

    // add todo with typeorm
    @Post()
    async addTodoV2(
        @Body() newTodo: AddTodoDto,
        @Req() req,
    ){
        return await this.todoService.addTodoV2(newTodo, req['user'].id);
    }

    // @Get(':id')
    // getTodoById(@Body('id') id: string) {
    //     return this.todoService.getTodoById(id);
    // }

    // get todo with typeorm
    @Get('/:id')
    async getTodoByIdV2(@Param("id", ParseIntPipe) id) {
        return await this.todoService.getTodoByIdV2(id);
    }

    // @Delete(':id')
    // deleteTodoByID(
    //   @Param('id') id : string,
    // ) {
    //   return this.todoService.deleteTodoById(id);
    // }
    
    @Delete('/:id')
    async softDeleteTodo(
        @Param('id') id : string,
        @Req() req,
    ) {
        return await this.todoService.softDeleteTodoById(+id, req['user'].id);
    }

    @Get('restore/:id')
    async restoreTodo(
        @Param('id') id : string,
    ) {
        return await this.todoService.restoreTodoById(+id);
    }

    // @Patch(':id')
    // updateTodoByID(
    //     @Param('id') id : string,
    //     @Body() newTodo: Partial<UpdateTodoDto>
    //     ) {
    //       return this.todoService.updateTodoById(id, newTodo);
    //     }
    
    // update todo with typeorm
    
    @Patch('/:id')
    async updateTodoByIDV2(
        @Param('id') id : string,
        @Body() newTodo: UpdateTodoDto,
        @Req() req
        ) {
            return await this.todoService.updateTodoByIdV2(+id, newTodo, req['user'].id);
    }

    // @Get('/countall')
    // async countTodo(){
    //     return await this.todoService.countTodo();
    // }

    @Get('/count/status')
    async countTodoByStatus(
        @Req() req,
    ){
        return await this.todoService.countTodoByStatus(req['user']);
    }
}
