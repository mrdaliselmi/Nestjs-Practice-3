import { IsEmail, IsNotEmpty } from "class-validator";


export class userSubscribeDto {
    @IsNotEmpty()
    username: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
}