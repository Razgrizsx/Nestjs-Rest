import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismadbService extends PrismaClient {
    constructor(){
        super({
            datasources:{
                db:{
                    url: "mongodb+srv://razgrisss41:Abc47599541@cluster0.dkqqwgl.mongodb.net/nestjs"
                }
            }
        })
    }
}
