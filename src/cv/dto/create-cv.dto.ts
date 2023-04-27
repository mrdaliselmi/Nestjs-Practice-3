import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator"

export class CreateCvDto {

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    age : number

    @IsString()
    @IsNotEmpty()
    job : string

    @IsString()
    @IsNotEmpty()
    cin : string

    @IsString()
    @IsNotEmpty()
    name : string

    @IsString()
    @IsNotEmpty()
    firstname : string

    @IsString()
    @IsNotEmpty()
    path : string

    @IsArray()
    skills: string[];
}
