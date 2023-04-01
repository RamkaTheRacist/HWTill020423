import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from './users.model';
import { Role } from 'src/roles/role.model';
import { UserRole } from 'src/user-roles/user-roles.model';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/roles/roles.module';
import { Profile } from 'src/profile/profile.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([User, Role, UserRole, Profile]),
    RolesModule
  ], exports: [
    UsersService
  ]
})
export class UsersModule { }
