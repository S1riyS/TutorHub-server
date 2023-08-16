import { forwardRef, Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { UserModule } from '@user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
