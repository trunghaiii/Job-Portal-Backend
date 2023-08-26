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

  create(createUserDto: CreateUserDto) {
    //console.log("bitch", createUserDto);
    const hash = hashSync(createUserDto.password, saltRounds);

    const createdUser = new this.UserModel({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hash
    });
    return createdUser.save();

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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
