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

    async validateUser(email: string, password: string) {
        try {
            const user = await this.userService.IsEmailExists(email);
            const passwordIsMatch = compareSync(password, user.password);
            if (user && passwordIsMatch) {
                const { password, ...result } = user;
                return result;
            }
        } catch (error) {
            return null;
        }

    }

    login(user: any) {
        const payload = {
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            sub: user.id
        }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}