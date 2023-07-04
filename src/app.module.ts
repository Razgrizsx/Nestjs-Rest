import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismadbModule } from './prismadb/prismadb.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule, PrismadbModule],
})
export class AppModule {}
