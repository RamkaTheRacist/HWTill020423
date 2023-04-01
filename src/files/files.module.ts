import { forwardRef, Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { Files } from './files.model';
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [FilesService],
  controllers: [FilesController],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([Files]),
  ],
  exports: [
    FilesService,
  ]
})
export class FilesModule { }
