import { IsNotEmpty , IsString, MaxLength, MinLength, ValidationArguments,  } from "class-validator";
import { LengthErrorMessage, RequiredFieldErrorMessage } from "../../common/errors";

export class AddTodoDto {
  
  @IsString()
  @IsNotEmpty(RequiredFieldErrorMessage({targetName: 'name'} as ValidationArguments))
  @MinLength(3,LengthErrorMessage(true,3))
  @MaxLength(10, LengthErrorMessage(false,10))
  name: string;

  @IsString()
  @IsNotEmpty(RequiredFieldErrorMessage({targetName: 'name'} as ValidationArguments))
  @MinLength(10,LengthErrorMessage(true,10))
  description: string;
}