import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        console.log('validate');
        
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:'clEciwpf4p'
        })
    }
    async validate(payload:any){
        console.log('validate2');

        return {id:payload.id}
    }
}