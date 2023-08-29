import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { Response } from "express"

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByName(username);

        if (user) {
            const isValidPass = await this.usersService.checkPassword(pass, user.password);

            if (isValidPass) return user;
        }

        return null;
    }

    async login(user: IUser, response: Response) {
        const { _id, name, email, role } = user;
        const payload = { _id, name, email, role };

        const refresh_token = this.generateRefreshToken(payload)
        //0. update refresh token in the database:
        await this.usersService.updateRefreshTokenDB(refresh_token, _id)

        //1. set cookies for refresh token:
        response.cookie('refresh_token', refresh_token,
            {
                httpOnly: true,
                maxAge: ms(this.configService.get<string>('REFRESH_TOKEN_EXPIRE'))
            }
        )

        //2. return response to front end
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: refresh_token,
            user: {
                _id,
                name,
                email,
                role
            }

        };
    }

    generateRefreshToken = (payload: any) => {
        return this.jwtService.sign(
            payload,
            {
                secret: this.configService.get<string>('REFRESH_TOKEN_KEY'),
                expiresIn: ms(this.configService.get<string>('REFRESH_TOKEN_EXPIRE')) / 1000
            }
        );
    }
}
