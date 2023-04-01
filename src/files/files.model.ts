import { ApiProperty } from "@nestjs/swagger";
import { Model, DataType, Column, Table } from "sequelize-typescript";

interface FilesCreationAttrs {
    name: string;
    essenceTable: string;
    essenceId: number;
}
@Table({ tableName: 'files', updatedAt: false })
export class Files extends Model<Files, FilesCreationAttrs>{

    @ApiProperty({ example: '1', description: "Unique ID" })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'kjhfkjeshfjkse.jpg', description: "File name" })
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @ApiProperty({ example: 'text-block', description: "Table where thing is" })
    @Column({ type: DataType.STRING, allowNull: true })
    essenceTable: string;

    @ApiProperty({ example: '1', description: "Thing`s ID which uses this file" })
    @Column({ type: DataType.INTEGER, allowNull: true })
    essenceId: number;
}