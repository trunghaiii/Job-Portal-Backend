import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

import { hashSync } from "bcrypt"

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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
