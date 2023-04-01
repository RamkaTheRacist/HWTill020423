import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from 'src/dtos/create-role.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/guards/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from './role.model';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) { }

    @ApiOperation({ summary: 'Add role' })
    @ApiResponse({ status: 200, type: Role })
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    createRole(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto);
    }

    @ApiOperation({ summary: 'Get role by name' })
    @ApiResponse({ status: 200, type: Role })
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/role/:value')
    getRoleByValue(@Param('value') value: string) {
        return this.rolesService.getRoleByValue(value);
    }

    @ApiOperation({ summary: 'Get all roles' })
    @ApiResponse({ status: 200, type: [Role] })
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/all')
    getAllRoles() {
        return this.rolesService.getAllRoles();
    }
}
