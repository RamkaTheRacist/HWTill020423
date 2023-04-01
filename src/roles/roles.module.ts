import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './role.model';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from 'src/users/users.model';
import { UserRole } from 'src/user-roles/user-roles.model';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([Role, User, UserRole]),
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule { }
