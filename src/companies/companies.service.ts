import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './schemas/company.schema';
import { Model } from 'mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';

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

  async findAllPagination(currentPage: string, limit: string, queryString: string) {
    const { sort, projection, population } = aqp(queryString);
    // 1. calculate skip:
    const skip: number = (+currentPage - 1) * +limit

    // 2. calculate totalPages and totalCompanies
    const totalCompanies: number = (await this.companyModel.find({})).length
    const totalPages: number = Math.ceil(totalCompanies / +limit)

    // 3. query result by skip and limit
    const result = await this.companyModel.find({})
      .skip(skip)
      .limit(+limit)
    // .sort(sort)
    // .select(projection)
    // .populate(population)

    return {
      meta: {
        current: +currentPage, //the current page
        pageSize: +limit, //number of companies each page
        pages: totalPages, //number of pages
        total: totalCompanies // total number of companies
      },
      result //kết quả query
    }

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

  async remove(id: string) {
    const deleteCompany = await this.companyModel.deleteOne(
      {
        _id: id
      }
    )
    return deleteCompany;
  }
}
