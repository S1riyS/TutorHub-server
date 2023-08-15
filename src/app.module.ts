import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/prisma.module';
import { UserModule } from '@user/user.module';
import { TutorModule } from './tutor/tutor.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [PrismaModule, UserModule, TutorModule, StudentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
