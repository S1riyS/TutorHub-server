import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/prisma.module';
import { UserModule } from '@user/user.module';
import { TutorModule } from './tutor/tutor.module';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    TutorModule,
    StudentModule,
    AuthModule,
  ],
})
export class AppModule {}
