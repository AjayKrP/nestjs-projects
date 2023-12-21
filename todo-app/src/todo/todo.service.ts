import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TodoService {
    constructor(private readonly prisma: PrismaService) { }
    getAllTodos() {
        return this.prisma.todo.findMany();
    }

    createTodo(body: Prisma.TodoCreateInput) {
        return this.prisma.todo.create({
            data: body
        })
    }

    updateTodo(id: number, body: Prisma.TodoUpdateInput) {
        return this.prisma.todo.update({ where: { id }, data: body },)
    }

    deleteTodo(id: number) {
        return this.prisma.todo.delete({ where: { id } })
    }

    getTodo(id: number) {
        return this.prisma.todo.findUnique({ where: { id } })
    }
}