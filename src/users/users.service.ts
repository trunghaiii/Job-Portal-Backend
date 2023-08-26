import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

import { hashSync, compareSync } from "bcrypt"

const saltRounds: number = 10;

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private UserModel: Model<User>) { }

  async create(createUserDto: CreateUserDto, user: any) {

    // 0. check if email already existed in database:
    const existedEmail = await this.UserModel.findOne({ email: createUserDto.email })

    if (existedEmail) throw new BadRequestException("Email Already Existed");
    // 1. hash the password using bcrypt
    const hash = hashSync(createUserDto.password, saltRounds);

    // 2. save user data to the database:
    const createUser = new this.UserModel({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hash,
      age: +createUserDto.age,
      gender: createUserDto.gender,
      address: createUserDto.address,
      role: createUserDto.role,
      company: createUserDto.company,
      createdBy: {
        id: user._id,
        email: user.email
      }
    }).save();

    return createUser;


  }

  async registerUser(registerUserDto: RegisterUserDto) {

    // console.log("gg", registerUserDto);
    // 0. check if email already existed in database:
    const existedEmail = await this.UserModel.findOne({ email: registerUserDto.email })

    if (existedEmail) throw new BadRequestException("Email Already Existed");
    // 1. hash the password using bcrypt
    const hash = hashSync(registerUserDto.password, saltRounds);

    // 2. save user data to the database:
    const registerUser = new this.UserModel({
      name: registerUserDto.name,
      email: registerUserDto.email,
      password: hash,
      age: +registerUserDto.age,
      gender: registerUserDto.gender,
      address: registerUserDto.address,
      role: "USER"
    }).save();
    return registerUser;

  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findOneByName(username: string) {
    return this.UserModel.findOne({ email: username });
  }

  checkPassword(pass: string, hash: string) {
    return compareSync(pass, hash);
  }

  async update(updateUserDto: UpdateUserDto, user: any) {

    // 1. update user data to the database:
    const updateUser = await this.UserModel.findByIdAndUpdate(updateUserDto._id, {
      name: updateUserDto.name,
      email: updateUserDto.email,
      age: +updateUserDto.age,
      gender: updateUserDto.gender,
      address: updateUserDto.address,
      role: updateUserDto.role,
      company: updateUserDto.company,
      updatedBy: {
        id: user._id,
        email: user.email
      }
    });

    return updateUser;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
