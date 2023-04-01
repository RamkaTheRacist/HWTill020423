import { BadRequestException, Injectable } from '@nestjs/common';
import { TextBlockDto } from 'src/dtos/text-block.dto';
import { InjectModel } from "@nestjs/sequelize";
import { TextBlock } from './text-block.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class TextBlockService {

    constructor(@InjectModel(TextBlock) private textBlockRepository: typeof TextBlock, private filesService: FilesService) { }

    async getAllTBlock() {
        const tBlocks = await this.textBlockRepository.findAll();
        return tBlocks;
    }


    async getOneTBlock(name: string) {
        const tBlock = await this.textBlockRepository.findOne({ where: { uniqueName: name } })
        if (!tBlock) {
            throw new BadRequestException('Havent such text block');
        }
        return tBlock;
    }

    async addTBlock(dto: TextBlockDto, image: any) {
        const tBlockFromDb = await this.textBlockRepository.findOne({ where: { uniqueName: dto.uniqueName } });
        if (tBlockFromDb) {
            throw new BadRequestException('Such text block exists');
        }
        if (!image) {
            const tBlock = await this.textBlockRepository.create({ ...dto, image: null });
            return tBlock;
        }
        const fileName = await this.filesService.uploadFile(image);
        const tBlock = await this.textBlockRepository.create({ ...dto, image: fileName });
        await this.filesService.addEssences(fileName, 'text-block', tBlock.id);
        return tBlock;
    }

    async deleteTBlock(name: string) {
        const tBlock = await this.textBlockRepository.findOne({ where: { uniqueName: name } });
        if (!tBlock) {
            throw new BadRequestException('Havent such text block');
        }
        await this.filesService.removeEssences(tBlock.image);
        await this.textBlockRepository.destroy({ where: { uniqueName: name } });
        return tBlock;
    }

    async updateTBlock(dto: TextBlockDto, image: any) {
        const tBlock = await this.textBlockRepository.findOne({ where: { uniqueName: dto.uniqueName } });
        let fileName = tBlock.image;
        if (!tBlock) {
            throw new BadRequestException('Havent such text block');
        }
        if (image) {
            fileName = await this.filesService.uploadFile(image);
        }
        tBlock.name = dto.name;
        tBlock.image = fileName;
        tBlock.text = dto.text;
        tBlock.group = dto.group;
        return tBlock.save();
    }

    async getAllByGroup(name: string) {
        const tBlocks = await this.textBlockRepository.findAll({ where: { group: name } });
        return tBlocks;
    }
}
