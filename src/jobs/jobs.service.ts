import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './shemas/job.schema';
import { Model } from 'mongoose';

@Injectable()
export class JobsService {

  constructor(@InjectModel(Job.name) private JobModel: Model<Job>) { }

  async create(createJobDto: CreateJobDto) {

    // 0. save the createJobDto data in the database:

    const result = await this.JobModel.create(createJobDto)
    return result;
  }

  findAll() {
    return `This action returns all jobs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  async update(id: string, updateJobDto: UpdateJobDto) {

    // 0. update Job data in the database:
    const result = await this.JobModel.findByIdAndUpdate(id, updateJobDto)

    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
