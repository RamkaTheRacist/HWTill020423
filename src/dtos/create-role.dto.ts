import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({ example: 'ADMIN', description: "Unique role name" })
    @IsString({ message: 'Must be string' })
    @Length(4, 254, { message: 'Must be longer than 4 and shorter than 254' })
    readonly value: string;

    @ApiProperty({ example: 'This is admin', description: "Role description" })
    @IsString({ message: 'Must be string' })
    @Length(4, 254, { message: 'Must be longer than 4 and shorter than 254' })
    readonly description: string;
}
