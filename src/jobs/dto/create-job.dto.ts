
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, IsNotEmptyObject, IsObject, ValidateNested, IsArray, IsBoolean } from 'class-validator';
import mongoose from 'mongoose';

class Company {
    @IsNotEmpty()
    id: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    name: string;
}

export class CreateJobDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsArray()
    skills: string[];

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNotEmpty()
    salary: number;

    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    @IsString()
    level: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;


}

