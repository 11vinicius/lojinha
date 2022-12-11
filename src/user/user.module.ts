import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { IsEmailUniqueValidator } from "./validator/isEmail";
import { MulterModule } from '@nestjs/platform-express/multer/multer.module';
import { diskStorage } from 'multer';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, IsEmailUniqueValidator],
  imports:[
    MulterModule.register({
      storage: diskStorage({
        destination: 'uploads'
      })
    })
  ]
})
export class UserModule {}
