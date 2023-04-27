import { IsEnum, IsOptional, IsString, Max, Min } from "class-validator";
import { TodoStatusEnum } from "../todo-status.enum";
import { AddTodoDto } from "./addtodo.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateTodoDto extends PartialType(AddTodoDto) {
  
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
}