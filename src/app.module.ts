import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-guard';

@Module({
  imports: [
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    JwtAuthGuard
  ],
})
export class AppModule { }
