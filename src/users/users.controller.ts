import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddRoleDto } from 'src/dtos/add-role.dto';
import { BanDto } from 'src/dtos/ban.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/guards/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/roles/role.model';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [User] })
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({ summary: 'Add role to users' })
    @ApiResponse({ status: 200, type: User })
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/role/add')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({ summary: 'Remove role from users' })
    @ApiResponse({ status: 200, type: Role })
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('/role/remove')
    deleteRole(@Body() dto: AddRoleDto) {
        return this.usersService.deleteRole(dto);
    }

    @ApiOperation({ summary: 'Ban users' })
    @ApiResponse({ status: 200, type: Role })
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanDto) {
        return this.usersService.ban(dto);
    }
}
