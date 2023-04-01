import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Token } from 'src/token/token.model';
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    SequelizeModule.forFeature([Token]),
    JwtModule.register({})
  ],
  exports: [
    AuthService,
    JwtModule,
  ]
})
export class AuthModule { }
