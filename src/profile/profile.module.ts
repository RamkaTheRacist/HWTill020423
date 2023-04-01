import { forwardRef, Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { Profile } from './profile.model';
import { User } from 'src/users/users.model';
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([User, Profile]),
    UsersModule,
  ], exports: [
    ProfileService
  ]
})
export class ProfileModule { }
