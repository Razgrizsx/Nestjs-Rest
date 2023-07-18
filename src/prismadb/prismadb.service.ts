import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config/dist';

@Injectable()
export class PrismadbService extends PrismaClient {
    constructor(config: ConfigService){
        super({
            datasources:{
                db:{
                    url: config.get("DATABASE_URL")
                }
            }
        })
    }
}
