import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TextBlockDto } from 'src/dtos/text-block.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/guards/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { TextBlock } from './text-block.model';
import { TextBlockService } from './text-block.service';

@ApiTags('Text blocks')
@Controller('text-block')
export class TextBlockController {

    constructor(private textBlockService: TextBlockService) { }

    @ApiOperation({ summary: 'Get all text blocks' })
    @ApiResponse({ status: 200, type: [TextBlock] })
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.textBlockService.getAllTBlock();
    }


    @ApiOperation({ summary: 'Get all text blocks by group' })
    @ApiResponse({ status: 200, type: [TextBlock] })
    @UseGuards(JwtAuthGuard)
    @Get('/group/:name')
    getAllByGroup(@Param('name') name: string) {
        return this.textBlockService.getAllByGroup(name);
    }


    @ApiOperation({ summary: 'Get text block by name' })
    @ApiResponse({ status: 200, type: TextBlock })
    @UseGuards(JwtAuthGuard)
    @Get('/get/:name')
    getOne(@Param('name') name: string) {
        return this.textBlockService.getOneTBlock(name);
    }

    @ApiOperation({ summary: 'Add text block' })
    @ApiResponse({ status: 200, type: TextBlock })
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/add')
    @UseInterceptors(FileInterceptor('image'))
    addTBlock(@Body() dto: TextBlockDto, @UploadedFile() image) {
        return this.textBlockService.addTBlock(dto, image);
    }

    @ApiOperation({ summary: 'Remove text block by name' })
    @ApiResponse({ status: 200, type: TextBlock })
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('/remove/:name')
    deleteTBlock(@Param('name') name: string) {
        return this.textBlockService.deleteTBlock(name);
    }

    @ApiOperation({ summary: 'Update text block' })
    @ApiResponse({ status: 200, type: TextBlock })
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('/update')
    @UseInterceptors(FileInterceptor('image'))
    updateTBlock(@Body() dto: TextBlockDto, @UploadedFile() image) {
        return this.textBlockService.updateTBlock(dto, image);
    }
}
