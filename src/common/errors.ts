import { ValidationArguments } from "class-validator";

const minLengthErrorMessage = (length: number) =>{
    return  {message : `Must be at least' ${length} characters long`};
}

const maxLengthErrorMessage = (length: number) =>{
    return {message : `Must be at most ${length} characters long`};
}

export const LengthErrorMessage = (state: boolean, length: number) => {
    if (state) {
        return(minLengthErrorMessage(length));
    }
    return(maxLengthErrorMessage(length));
}

export const RequiredFieldErrorMessage = (args: ValidationArguments) => {
    return {message : `The ${args.targetName} field cannot be empty`};
}