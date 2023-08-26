import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage } from 'src/decorators/decoratorCustomize';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ResponseMessage("Create New User Successfully!!")
  create(@Body() createUserDto: CreateUserDto, @Request() req) {

    return this.usersService.create(createUserDto, req.user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Public()
  @ResponseMessage("Get User Data Successfully!!")
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch()
  @ResponseMessage("Update User Successfully!!")
  update(@Body() updateUserDto: UpdateUserDto, @Request() req) {

    return this.usersService.update(updateUserDto, req.user);
  }

  @Delete(':id')
  @ResponseMessage("Delete User Successfully!!")
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
