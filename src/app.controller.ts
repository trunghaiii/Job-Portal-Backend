import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller("auth")
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  Login(@Request() req) {
    return this.authService.login(req.user);
  }
}
