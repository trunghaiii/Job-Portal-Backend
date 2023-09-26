
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';


export class CreateCompanyDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    logo: string;

}
