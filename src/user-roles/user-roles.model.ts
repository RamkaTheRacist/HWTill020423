import { ApiProperty } from "@nestjs/swagger";
import { Model, DataType, Column, Table, BelongsToMany, ForeignKey } from "sequelize-typescript";
import { Role } from "src/roles/role.model";
import { User } from "src/users/users.model";

@Table({ tableName: 'user_role', createdAt: false, updatedAt: false })
export class UserRole extends Model<UserRole>{

    @ApiProperty({ example: '1', description: "Unique ID" })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: '1', description: "Role ID" })
    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER })
    roleId: number;

    @ApiProperty({ example: '1', description: "User ID" })
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;
}