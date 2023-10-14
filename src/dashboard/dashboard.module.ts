import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { UsersModule } from 'src/users/users.module';
import { JobsModule } from 'src/jobs/jobs.module';

@Module({
  imports: [UsersModule, JobsModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule { }
