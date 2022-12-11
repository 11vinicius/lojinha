import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport/dist/passport/passport.strategy";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly authService: AuthService
    ){
        super({ usernameField: 'email' })
    }

    async validate(email: string, password: string){
        const user = await this.authService.Validate(email, password);

        if(!user){
            return new UnauthorizedException('email e/ou senha');
        }
        return user
    }
}