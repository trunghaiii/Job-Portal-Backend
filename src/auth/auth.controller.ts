import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/decoratorCustomize';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller("auth")
export class AuthController {
    constructor(
        // private readonly appService: AppService,
        private authService: AuthService
    ) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post("login")
    Login(@Request() req) {
        return this.authService.login(req.user);
    }

    //@UseGuards(JwtAuthGuard)
    @Get("profile")
    getProfile(@Request() req) {
        return req.user;
    }
}
