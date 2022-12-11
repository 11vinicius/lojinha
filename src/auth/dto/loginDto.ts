import {  IsEmail, IsNotEmpty  } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

    @ApiProperty()
    @IsEmail(undefined,{message:'Email inválido.'})
    email: string

    @ApiProperty()
    @IsNotEmpty({message:'Campo password ovrigatório.'})
    password: string
}
