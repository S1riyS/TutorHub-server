import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/prisma.module';
import { UserModule } from '@user/user.module';
import { TutorModule } from './tutor/tutor.module';

@Module({
  imports: [PrismaModule, UserModule, TutorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
