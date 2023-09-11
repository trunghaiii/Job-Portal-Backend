import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, User } from 'src/decorators/decoratorCustomize';
import { IUser } from './users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ResponseMessage("Create New User Successfully!!")
  create(
    @Body() createUserDto: CreateUserDto,
    @User() user: IUser) {

    return this.usersService.create(createUserDto, user);
  }

  @Get()
  @ResponseMessage("Get All User with Pagination Successfully!!")
  findAllPagination(
    @Query("page") currentPage: string,
    @Query("limit") limit: string,
    @Query() queryString: string
  ) {
    return this.usersService.findAllPagination(currentPage, limit, queryString);
  }

  @Get(':id')
  @Public()
  @ResponseMessage("Get User Data Successfully!!")
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch()
  @ResponseMessage("Update User Successfully!!")
  update(
    @Body() updateUserDto: UpdateUserDto,
    @User() user: IUser) {

    return this.usersService.update(updateUserDto, user);
  }

  @Delete(':id')
  @ResponseMessage("Delete User Successfully!!")
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
