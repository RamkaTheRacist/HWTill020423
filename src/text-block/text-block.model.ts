import { ApiProperty } from "@nestjs/swagger";
import { Model, DataType, Column, Table } from "sequelize-typescript";



interface TextBlockCreationAttrs {
    uniqueName: string;
    name: string;
    image: string;
    text: string;
    group: string;
}

@Table({ tableName: 'text_block', createdAt: false, updatedAt: false })
export class TextBlock extends Model<TextBlock, TextBlockCreationAttrs>{

    @ApiProperty({ example: '1', description: "Unique ID" })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'main-hero-text', description: "Unique name" })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    uniqueName: string;

    @ApiProperty({ example: 'testName', description: "Not unique name" })
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @ApiProperty({ example: 'afeghjgjfse.jpg', description: "Image name" })
    @Column({ type: DataType.STRING, allowNull: true })
    image: string;

    @ApiProperty({ example: 'any text', description: "Text" })
    @Column({ type: DataType.TEXT, allowNull: true })
    text: string;

    @ApiProperty({ example: 'main-page', description: "Group" })
    @Column({ type: DataType.STRING, allowNull: true })
    group: string;

}