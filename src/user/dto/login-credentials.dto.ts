import { IsNotEmpty } from "class-validator";


export class loginCredentialsDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}