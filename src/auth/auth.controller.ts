import { Controller, Get, Post, UseGuards, Body, Res, Req } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, User } from 'src/decorators/decoratorCustomize';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Response, Request } from "express"
import { IUser } from 'src/users/users.interface';
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
        @Req() req,
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
    Account(@User() user: IUser) {

        return { user };
    }

    @Public()
    @Get("refresh")
    @ResponseMessage("Get refresh token user data Successfully!!")
    RefreshTokenAccount(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response
    ) {
        const refreshToken = request.cookies['refresh_token']

        return this.authService.handleRefreshToken(refreshToken, response);
    }

    @Post("logout")
    @ResponseMessage("Logout Successfully!!")
    Logout(
        @User() user: IUser,
        @Res({ passthrough: true }) response: Response
    ) {

        return this.authService.handleLogOut(response, user);
    }

    //@UseGuards(JwtAuthGuard)
    // @Get("profile")
    // getProfile(@Request() req) {
    //     return req.user;
    // }
}
