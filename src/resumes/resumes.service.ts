import { Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Resume } from './schemas/resume.schema';
import { Model } from 'mongoose';

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

  findAll() {
    return `This action returns all resumes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resume`;
  }

  update(id: number, updateResumeDto: UpdateResumeDto) {
    return `This action updates a #${id} resume`;
  }

  remove(id: number) {
    return `This action removes a #${id} resume`;
  }
}
