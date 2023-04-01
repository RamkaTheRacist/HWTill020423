import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/guards/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserOrAdminGuard } from 'src/guards/userOrAdmin.guard';
import { UsersService } from 'src/users/users.service';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';

@ApiTags('Profiles')
@Controller('profile')
export class ProfileController {
    constructor(private profileservice: ProfileService, private userService: UsersService, private authServuce: AuthService) { }

    @ApiOperation({ summary: 'Registrate user and profile' })
    @ApiResponse({ status: 200, type: Profile })
    @Post('/registration')
    createProfile(@Body() userDto: CreateUserDto) {
        return this.profileservice.createProfile(userDto);
    }

    @ApiOperation({ summary: 'Get profile by id' })
    @ApiResponse({ status: 200, type: Profile })
    @UseGuards(JwtAuthGuard)
    @Get('/profileId/:id')
    getProfile(@Param('id') id: number) {
        return this.profileservice.getProfile(id);
    }

    @ApiOperation({ summary: 'Get all profiles' })
    @ApiResponse({ status: 200, type: [Profile] })
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    getAllProfiles() {
        return this.profileservice.getAllProfiles();
    }

    @ApiOperation({ summary: 'Delete profile' })
    @ApiResponse({ status: 200, type: Profile })
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, UserOrAdminGuard)
    @Delete('/delete/:id')
    deleteProfile(@Param('id') id: number) {
        return this.profileservice.deleteProfile(id);
    }

    @ApiOperation({ summary: 'Update profile' })
    @ApiResponse({ status: 200, type: Profile })
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, UserOrAdminGuard)
    @Put('/change/:id')
    changeProfile(@Body() userDto: CreateUserDto, @Param('id') id: number) {
        return this.profileservice.changeProfile(userDto, id);
    }
}