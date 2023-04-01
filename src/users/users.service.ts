import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from 'src/dtos/add-role.dto';
import { BanDto } from 'src/dtos/ban.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService) { }


    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER");
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({ include: { all: true } });
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }

        throw new HttpException('User or role doesnt exist', HttpStatus.NOT_FOUND);
    }

    async deleteRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (dto.value == 'USER') {
            throw new HttpException('Role USER is protected', HttpStatus.BAD_REQUEST);
        }
        if (role && user) {
            await user.$remove('role', role.id);
            return dto;
        }

        throw new HttpException('User doesnt exist or dont have such role', HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new HttpException('User doesnt exist', HttpStatus.NOT_FOUND);
        }
        user.banned = dto.ban;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }


}
