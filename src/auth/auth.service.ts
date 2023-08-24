import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByName(username);

        if (user) {
            const isValidPass = await this.usersService.checkPassword(pass, user.password);

            if (isValidPass) return user;
        }

        return null;
    }

    async login(user: IUser) {
        const { _id, name, email, role } = user;
        const payload = { _id, name, email, role };
        return {
            access_token: this.jwtService.sign(payload),
            _id,
            name,
            email,
            role
        };
    }
}
