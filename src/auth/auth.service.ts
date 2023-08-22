import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByName(username);

        if (user) {
            const isValidPass = await this.usersService.checkPassword(pass, user.password);

            if (isValidPass) return user;
        }

        return null;
    }
}
