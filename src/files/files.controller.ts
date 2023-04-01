import { Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/guards/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Files } from './files.model';
import { FilesService } from './files.service';

@ApiTags('Files')
@Controller('files')
export class FilesController {
    constructor(private filesService: FilesService) { }

    @ApiOperation({ summary: 'Upload file' })
    @ApiResponse({ status: 200, type: Files })
    @UseGuards(JwtAuthGuard)
    @Post('/add')
    @UseInterceptors(FileInterceptor('image'))
    createProfile(@UploadedFile() image: any) {
        return this.filesService.uploadFile(image);
    }

    @ApiOperation({ summary: 'Get all files' })
    @ApiResponse({ status: 200, type: [Files] })
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllFiles() {
        return this.filesService.getAll();
    }

    @ApiOperation({ summary: 'Remove unused files' })
    @ApiResponse({ status: 200, type: [Files] })
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/remove')
    removeTrash() {
        return this.filesService.removeTrash();
    }

}