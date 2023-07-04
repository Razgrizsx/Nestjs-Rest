import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismadbModule } from "src/prismadb/prismadb.module";

@Module({
    controllers: [AuthController],
    providers: [AuthService]
})

export class AuthModule{}