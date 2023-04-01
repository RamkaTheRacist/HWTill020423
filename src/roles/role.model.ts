import { ApiProperty } from "@nestjs/swagger";
import { Model, DataType, Column, Table, BelongsToMany } from "sequelize-typescript";
import { UserRole } from "src/user-roles/user-roles.model";
import { User } from "src/users/users.model";



interface RoleCreationAttrs {
    value: string;
    description: string;
}

@Table({ tableName: 'roles', createdAt: false, updatedAt: false })
export class Role extends Model<Role, RoleCreationAttrs>{

    @ApiProperty({ example: '1', description: "Unique ID" })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'ADMIN', description: "Unique role name" })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    value: string;

    @ApiProperty({ example: 'This is admin', description: "Role description" })
    @Column({ type: DataType.STRING, allowNull: false })
    description: string;

    @BelongsToMany(() => User, () => UserRole)
    users: User[];
}