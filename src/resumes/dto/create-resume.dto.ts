import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

export class CreateResumeDto {
    @IsString()
    @IsNotEmpty()
    url: string;

    @IsNotEmpty()
    @IsString()
    companyId: string;

    @IsNotEmpty()
    @IsString()
    jobId: string;


}
