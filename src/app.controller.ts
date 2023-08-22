import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller("auth")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  Login(@Request() req) {
    return req.user;
  }
}
