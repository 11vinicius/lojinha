import { Injectable } from "@nestjs/common/decorators";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserService } from "../user.service";

@ValidatorConstraint({async: true})
@Injectable()
export class IsEmailUniqueValidator implements ValidatorConstraintInterface{
    constructor(
        private readonly userService: UserService
    ){}

    async validate(value: any, validationArguments?:ValidationArguments):Promise<boolean>{
        const isUser = await this.userService.IsEmailExists(value);
        return !isUser
    }
}


export const IsEmailUnique = (option: ValidationOptions)=>{
    return (object: Object, property: string)=>{
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: option,
            constraints:[],
            validator: IsEmailUniqueValidator
        });
    }
}