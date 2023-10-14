import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { UsersService } from 'src/users/users.service';
import { JobsService } from 'src/jobs/jobs.service';

@Injectable()
export class DashboardService {

  constructor(
    private usersService: UsersService,
    private jobsService: JobsService

  ) { }

  create(createDashboardDto: CreateDashboardDto) {
    return 'This action adds a new dashboard';
  }

  async findDashboardData() {
    let userNumber: number = await this.usersService.findUserNumber();
    let jobNumber: number = await this.jobsService.findJobNumber();


    return { userNumber, jobNumber };

  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
