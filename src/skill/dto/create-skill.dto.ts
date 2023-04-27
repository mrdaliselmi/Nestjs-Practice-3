import { IsNotEmpty } from "class-validator";

export class CreateSkillDto {
    @IsNotEmpty()
    designation: string;
}
