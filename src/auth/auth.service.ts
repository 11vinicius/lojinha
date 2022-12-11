import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async Validate(email: string, password: string) {
        const user = await this.userService.IsEmailExists(email);
        const passwordIsMatch = compareSync(password, user.password);
        if (user && passwordIsMatch) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    login(user: any) {
        console.log(user)
        const payload = { username: user.name, sub: user.id }
        return {
            access_tokem: this.jwtService.sign(payload)
        }
    }
}