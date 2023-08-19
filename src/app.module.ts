import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/prisma.module';
import { UserModule } from '@user/user.module';
import { TutorModule } from './tutor/tutor.module';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

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
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
