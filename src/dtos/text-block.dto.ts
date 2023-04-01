import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class TextBlockDto {
    @ApiProperty({ example: 'main-hero-text', description: "Unique name" })
    @IsString({ message: 'Must be string' })
    @Length(4, 254, { message: 'Must be longer than 4 and shorter than 254' })
    readonly uniqueName: string;

    @ApiProperty({ example: 'testName', description: "Not unique name" })
    @IsString({ message: 'Must be string' })
    @Length(4, 254, { message: 'Must be longer than 4 and shorter than 254' })
    readonly name: string;

    @ApiProperty({ example: 'any text', description: "Text" })
    readonly text: string;

    @ApiProperty({ example: 'main-page', description: "Group" })
    readonly group: string;
}