import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length } from "class-validator";

export class AddRoleDto {

    @ApiProperty({ example: '1', description: "User ID" })
    @IsNumber({}, { message: 'Must be number' })
    readonly userId: number;

    @ApiProperty({ example: 'ADMIN', description: "Unique role name" })
    @IsString({ message: 'Must be string' })
    @Length(4, 254, { message: 'Must be longer than 4 and shorter than 254' })
    readonly value: string;
}