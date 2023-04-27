/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Patch, Post, Put } from "@nestjs/common";

@Controller("first")
export class FirstController {
    @Get()
    getHello(): string {  
        console.log("Hello from first controller's get method");  
        return "Hello from first controller's get method";
    }
    @Post()
    postHello(): string {
        console.log("Hello from first controller's post method");
        return "Hello from first controller's post method";
    }
    @Patch()
    patchHello(): string {  
        console.log("Hello from first controller's patch method");
        return "Hello from first controller's patch method";
    }   
    @Delete()
    deleteHello(): string {
        console.log("Hello from first controller's delete method");
        return "Hello from first controller's delete method";
    }
    @Put()
    putHello(): string {
        console.log("Hello from first controller's put method");
        return "Hello from first controller's put method";
    }
}