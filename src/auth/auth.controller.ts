import { Controller, Get, Post, Request, UseGuards, Body, Res } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, User } from 'src/decorators/decoratorCustomize';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Response } from "express"
@Controller("auth")
export class AuthController {
    constructor(
        // private readonly appService: AppService,
        private authService: AuthService,
        private readonly usersService: UsersService
    ) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post("login")
    Login(
        @Request() req,
        @Res({ passthrough: true }) response: Response
    ) {
        return this.authService.login(req.user, response);
    }

    @Public()
    @Post("register")
    @ResponseMessage("Register new User Successfully!!")
    Register(@Body() registerUserDto: RegisterUserDto) {

        return this.usersService.registerUser(registerUserDto);
    }


    @Get("account")
    @ResponseMessage("Get account user data Successfully!!")
    Account(@User() user) {

        return { user };
    }

    //@UseGuards(JwtAuthGuard)
    // @Get("profile")
    // getProfile(@Request() req) {
    //     return req.user;
    // }
}
