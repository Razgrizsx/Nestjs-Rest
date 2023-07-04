import { Injectable } from "@nestjs/common";
import { PrismadbService } from "src/prismadb/prismadb.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'

@Injectable()

export class AuthService{
    constructor(private prismadb: PrismadbService){}
    
    async signup(dto : AuthDto){
        
        const hash = await argon.hash(dto.password)
        
        const user = await this.prismadb.user.create({
            data: {
                firstName: "Chris",
                lastName: "Rizzo",
                email: 'hola',
                hash
            }
        })
    }

    signin(){
        return {msg: 'signin'}
    }
}