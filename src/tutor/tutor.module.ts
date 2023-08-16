import { forwardRef, Module } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { TutorController } from './tutor.controller';
import { UserModule } from '@user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [TutorService],
  controllers: [TutorController],
})
export class TutorModule {}
