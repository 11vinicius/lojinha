import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constant';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    PrismaService,
    AuthService,
    LocalStrategy
  ]
})
export class AuthModule { }
