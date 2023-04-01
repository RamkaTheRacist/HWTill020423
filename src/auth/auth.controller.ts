import { Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Token } from 'src/token/token.model';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'Login' })
    @ApiResponse({ status: 200, type: Token })
    @Post('/login')
    async login(@Req() req: Request, @Res() res: Response) {
        try {
            const authDto = req.body;
            const userData = await this.authService.login(authDto);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (error) {
            return res.json(error.response)
        }
    }

    @ApiOperation({ summary: 'Logout' })
    @ApiResponse({ status: 200 })
    @UseGuards(JwtAuthGuard)
    @Post('/logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        try {
            const refreshToken = req.headers.cookie.split('=')[1];
            const token = await this.authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (error) {
            return res.json(error.response)
        }
    }

    @ApiOperation({ summary: 'Refresh tokens' })
    @ApiResponse({ status: 200, type: Token })
    @UseGuards(JwtAuthGuard)
    @Get('/refresh')
    async refresh(@Req() req: Request, @Res() res: Response) {
        try {
            if (!req.headers.cookie) {
                throw new UnauthorizedException({ message: 'No auth' });
            }
            const refreshToken = req.headers.cookie.split('=')[1];
            const userData = await this.authService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (error) {
            return res.json(error.response)
        }
    }

}
