import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService
  ){}
  
  create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 6);
    return this.prisma.user.create({
      data: createUserDto
    })
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        id: id
      }
    })
  }

  update(id:string, updateUserDto: UpdateUserDto) {
    try {
      updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 6);

      return this.prisma.user.update({
        data: updateUserDto,
        where:{
          id: id
        },
      })
    } catch (error) {
      return error
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  IsEmailExists(email: string){
    return this.prisma.user.findFirst({
        where:{
          email: email
        }
    });
  }
}
