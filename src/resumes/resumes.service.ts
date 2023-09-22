import { Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Resume } from './schemas/resume.schema';
import { Model } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class ResumesService {

  constructor(@InjectModel(Resume.name) private ResumeModel: Model<Resume>) { }

  create(createResumeDto: CreateResumeDto, user: IUser) {

    // 1. save resume data to the database:
    const createResume = new this.ResumeModel({
      email: user.email,
      userId: user._id,
      url: createResumeDto.url,
      status: "PENDING",
      companyId: createResumeDto.companyId,
      jobId: createResumeDto.jobId,
      createdBy: {
        id: user._id,
        email: user.email
      }
    }).save();

    return createResume;
  }

  async findAllPagination(current: string, limit: string, queryString: any) {

    const { filter } = aqp(queryString);
    delete filter.current

    // 1. calculate skip:
    const skip: number = (+current - 1) * +limit

    // 2. calculate totalPages and totalResumes
    let totalResumes: number = (await this.ResumeModel.find({})).length
    let totalPages: number = Math.ceil(totalResumes / +limit)

    // 3. query result by skip and limit
    const result = await this.ResumeModel.find(filter)
      .skip(skip)
      .limit(+limit)
    // .sort(sort)
    // .select(projection)
    // .populate(population)

    // 4. update totalResumes and totalPages after filtering
    const resultCount = await this.ResumeModel.find(filter).count()

    if (resultCount < totalResumes) {
      totalResumes = resultCount
      totalPages = Math.ceil(totalResumes / +limit)
    }
    return {
      meta: {
        current: +current, //the current page
        pageSize: +limit, //number of resumes each page
        pages: totalPages, //number of pages
        total: totalResumes // total number of resumes
      },
      result //kết quả query
    }


    return queryString;
  }

  findOne(id: number) {
    return `This action returns a #${id} resume`;
  }

  async updateStatus(id: string, updateResumeDto: UpdateResumeDto) {

    // 0. update status data in the database:
    const result = await this.ResumeModel.findByIdAndUpdate(id, updateResumeDto)

    return result;

  }

  async remove(id: string) {

    // 0. delete resume with corresponding id in the database

    const result = await this.ResumeModel.findByIdAndDelete(id)
    return result;
  }
}
