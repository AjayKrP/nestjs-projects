import { Controller, Delete, Get, Post, Put , Body, Param, ParseIntPipe} from "@nestjs/common";
import { TodoService } from "./todo.service";
import { Prisma } from "@prisma/client";

@Controller("todos")
export class TodoController {
    constructor(private readonly todoService: TodoService){}
    @Get()
    getAllTodos() {
        return this.todoService.getAllTodos()
    }

    @Post()
    createTodo(@Body() body: Prisma.TodoCreateInput) {
        return this.todoService.createTodo(body)
    }

    @Put(":id")
    updateTodo(@Param("id", ParseIntPipe) id: number, @Body() body: Prisma.TodoUpdateInput) {
        return this.todoService.updateTodo(id, body)
    }

    @Delete(":id")
    deleteTodo(@Param("id", ParseIntPipe) id: number) {
        return this.todoService.deleteTodo(id)
    }

    @Get(":id")
    getTodo(@Param("id", ParseIntPipe) id: number) {
        return this.todoService.getTodo(id)
    }
}