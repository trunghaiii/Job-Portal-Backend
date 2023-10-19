import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './schemas/company.schema';
import { Model } from 'mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import { JobsService } from 'src/jobs/jobs.service';

@Injectable()
export class CompaniesService {

  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
    private jobsService: JobsService
  ) { }

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
    const { filter, sort, projection, population } = aqp(queryString);
    delete filter.page;
    // console.log("filter", filter);

    // 1. calculate skip:
    const skip: number = (+currentPage - 1) * +limit

    // 2. calculate totalPages and totalCompanies
    let totalCompanies: number = (await this.companyModel.find({})).length
    let totalPages: number = Math.ceil(totalCompanies / +limit)

    // 3. query result by skip and limit
    const result = await this.companyModel.find(filter)
      .skip(skip)
      .limit(+limit)
    // .sort(sort)
    // .select(projection)
    // .populate(population)


    // 4. update totalCompanies, totalPages after filtering
    const resultCount = await this.companyModel.find(filter).count()

    if (resultCount < totalCompanies) {
      totalCompanies = resultCount
      totalPages = Math.ceil(totalCompanies / +limit)
    }


    // 5. return result
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

    // 0. delete company by id
    const deleteCompany = await this.companyModel.deleteOne(
      {
        _id: id
      }
    )

    // 1. find job list that match company id
    let jobList = await this.jobsService.findAllJobByCompanyId(id)

    // 2. delete joblist
    if (jobList && jobList.length !== 0) (
      jobList.map(async (job: any) => {
        await this.jobsService.remove(job._id)
      })
    )

    return deleteCompany;
  }
}
