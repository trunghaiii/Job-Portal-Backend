import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './shemas/job.schema';
import { Model } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class JobsService {

  constructor(@InjectModel(Job.name) private JobModel: Model<Job>) { }

  async create(createJobDto: CreateJobDto) {

    // 0. save the createJobDto data in the database:

    const result = await this.JobModel.create(createJobDto)
    return result;
  }

  async findAllPagination(current: string, limit: string, queryString: string) {

    const { filter } = aqp(queryString);
    delete filter.current

    // 1. calculate skip:
    const skip: number = (+current - 1) * +limit

    // 2. calculate totalPages and totalJobs
    let totalJobs: number = (await this.JobModel.find({})).length
    let totalPages: number = Math.ceil(totalJobs / +limit)

    // 3. query result by skip and limit
    const result = await this.JobModel.find(filter)
      .skip(skip)
      .limit(+limit)
    // .sort(sort)
    // .select(projection)
    // .populate(population)

    // 4. update totalJobs and totalPages after filtering
    const resultCount = await this.JobModel.find(filter).count()

    if (resultCount < totalJobs) {
      totalJobs = resultCount
      totalPages = Math.ceil(totalJobs / +limit)
    }
    return {
      meta: {
        current: +current, //the current page
        pageSize: +limit, //number of jobs each page
        pages: totalPages, //number of pages
        total: totalJobs // total number of jobs
      },
      result //kết quả query
    }

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

  async remove(id: string) {

    // 0. delete job with corresponding id in the database

    const result = await this.JobModel.findByIdAndDelete(id)
    return result;
  }
}
