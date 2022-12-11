import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { IsEmailUnique } from "../validator/isEmail";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {

    @ApiProperty()
    @IsNotEmpty({message: 'O Nome não pode ser vazio'})
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsEmail(undefined, {message: 'O e-mail informado é invalido'})
    @IsOptional()
    email: string;

    @ApiProperty()
    @MinLength(6,{message: 'A senha deve conter no minimo 6 caractere'})
    @IsOptional()
    password: string;

    @ApiProperty()
    avatar: string
}
