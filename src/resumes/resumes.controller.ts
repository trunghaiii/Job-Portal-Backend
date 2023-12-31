import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { IUser } from 'src/users/users.interface';
import { User } from 'src/decorators/decoratorCustomize';

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) { }

  @Post()
  create(
    @Body() createResumeDto: CreateResumeDto,
    @User() user: IUser
  ) {
    return this.resumesService.create(createResumeDto, user);
  }

  @Get()
  findAllPaginaton(
    @Query("current") current: string,
    @Query("limit") limit: string,
    @Query() queryString: string
  ) {

    return this.resumesService.findAllPagination(current, limit, queryString);
  }

  @Get("byuser")
  findAllByUser(
    @Query("current") current: string,
    @Query("limit") limit: string,
    @Query() queryString: string,
    @User() user: IUser
  ) {

    return this.resumesService.findAllByUser(current, limit, queryString, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(+id);
  }

  @Patch(':id')
  updateStatus(
    @Param('id') id: string,
    @Body() updateResumeDto: UpdateResumeDto) {
    return this.resumesService.updateStatus(id, updateResumeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resumesService.remove(id);
  }
}
