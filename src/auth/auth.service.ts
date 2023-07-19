import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismadbService } from "src/prismadb/prismadb.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { JwtService } from "@nestjs/jwt/dist";
import { ConfigService } from "@nestjs/config";


@Injectable()

export class AuthService{
    constructor(private prismadb: PrismadbService, private jwt: JwtService, private config: ConfigService){}
    
    async signup(dto : AuthDto){
        
        try {
            const hash = await argon.hash(dto.password)
            const user = await this.prismadb.user.create({
            data: {
                email: dto.email,
                hash
            },
            select:{
                id: true,
                email: true,
                createdAt: true
            }
        })
        return this.signToken((await user).id, (await user).email)           
        } catch (error) {
            if(error.name == "PrismaClientKnownRequestError"){
                if(error.code == "P2002") {
                    throw new ForbiddenException(
                        "Credentials Taken"
                    )
                }
            }
            return error
        }  
    }

    async signin(dto : AuthDto){
        const user = this.prismadb.user.findUnique({
            where:{
                email: dto.email
            }
        })
        if(!user) throw new ForbiddenException("User do not exist")
        const pwMatches = await argon.verify((await user).hash , dto.password)
        if(!pwMatches) throw new ForbiddenException("Wrong Password")
        return this.signToken((await user).id, (await user).email)
    }

       async signToken(userId: string, email: string){
            const data = {
            sub: userId,
            email: email
            }
            const token = await this.jwt.signAsync(data, {
            expiresIn: "30m",
            secret: this.config.get("JWT_SECRET")
            })
            return {
                access_token: token
            }
    }
}