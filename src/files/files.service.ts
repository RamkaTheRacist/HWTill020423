import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { InjectModel } from "@nestjs/sequelize";
import { Files } from './files.model';
@Injectable()
export class FilesService {

    constructor(@InjectModel(Files) private filesRepository: typeof Files) { }

    async uploadFile(file: any): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static', 'img', 'jpg');
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            fs.writeFile(path.join(filePath, fileName), file.buffer, () => { });
            await this.filesRepository.create({ name: fileName });
            return fileName;
        } catch (error) {
            throw new HttpException('Error while uploading file', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAll() {
        const files = await this.filesRepository.findAll();
        return files;
    }

    async addEssences(fileName: string, essenceTable: string, essenceId: number) {
        const file = await this.filesRepository.findOne({ where: { name: fileName } });
        file.essenceId = essenceId;
        file.essenceTable = essenceTable;
        return await file.save();
    }

    async removeEssences(fileName: string) {
        const file = await this.filesRepository.findOne({ where: { name: fileName } });
        file.essenceId = null;
        file.essenceTable = null;
        return await file.save();
    }

    async removeTrash() {
        const files = await this.getAll();
        let forRemove: number[] = [];
        files.forEach((key) => {
            if ((!key.essenceId || !key.essenceTable) && (Date.now() - key.createdAt > Number(process.env.TIMESTAMP_FOR_DELETE))) {
                forRemove.push(key.id);
            }
        });

        for (const iterator of forRemove) {
            await this.filesRepository.destroy({ where: { id: iterator } });
        }
        return await this.getAll();
    }
}
