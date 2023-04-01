import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Profile } from './profile.model';
@Injectable()
export class ProfileService {
    constructor(@InjectModel(Profile) private profileRepository: typeof Profile, private userService: UsersService, private authService: AuthService) { }


    async createProfile(userDto: CreateUserDto) {
        const user = await this.authService.registration(userDto);
        const userId = user.user.id;
        const prof = await this.profileRepository.create({ userId: userId, ...userDto });
        return prof;

    }

    async getProfile(id: number) {
        const prof = await this.profileRepository.findOne({ where: { userId: id } })
        if (!prof) {
            throw new BadRequestException('Havent such profile');
        }
        return prof;
    }

    async changeProfile(userDto: CreateUserDto, id: number) {
        const prof = await this.profileRepository.findOne({ where: { userId: id } })
        if (!prof) {
            throw new BadRequestException('Havent such profile');
        }
        prof.firstName = userDto.firstName;
        prof.secondName = userDto.secondName;
        prof.phoneNumber = userDto.phoneNumber;
        return prof.save();
    }

    async deleteProfile(id: number) {
        const prof = await this.profileRepository.findOne({ where: { userId: id } })
        if (!prof) {
            throw new BadRequestException('Havent such profile');
        }
        await this.profileRepository.destroy({ where: { userId: id } });
        return prof;
    }

    async getAllProfiles() {
        const profiles = await this.profileRepository.findAll();
        return profiles;
    }
}