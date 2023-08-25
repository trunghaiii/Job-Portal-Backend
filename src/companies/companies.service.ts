import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './schemas/company.schema';
import { Model } from 'mongoose';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class CompaniesService {

  constructor(@InjectModel(Company.name) private companyModel: Model<Company>) { }

  async create(createCompanyDto: CreateCompanyDto, user: IUser) {
    // console.log(createCompanyDto);
    const newCompany = await this.companyModel.create(
      {
        ...createCompanyDto,
        createdBy: {
          id: user._id,
          email: user.email
        }
      }
    )
    return newCompany;
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {

    let updateCompany = await this.companyModel.updateOne(
      { _id: id },
      {
        ...updateCompanyDto,
        updatedBy: {
          id: user._id,
          email: user.email
        }
      }
    )

    return updateCompany;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
