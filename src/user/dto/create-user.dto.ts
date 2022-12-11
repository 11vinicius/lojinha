import {  IsEmail, IsNotEmpty  } from "class-validator";
import { IsEmailUnique } from "../validator/isEmail";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty({message:'Campo nome obrigatório.'})
    name: string

    @ApiProperty()
    @IsEmail(undefined,{message:'Email inválido.'})
    @IsEmailUnique({message:'Email já cadastrado.'})
    email: string

    @ApiProperty()
    @IsNotEmpty({message:'Campo password ovrigatório.'})
    password: string
}
