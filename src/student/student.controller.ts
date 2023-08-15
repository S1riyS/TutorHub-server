import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentProfileDTO, UpdateStudentProfileDTO } from './dto';
import { ProfileResponse } from './responses';

@Controller('students')
@UseInterceptors(ClassSerializerInterceptor)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get(':userId/profile')
  async findOne(@Param('userId', ParseUUIDPipe) userId: string) {
    const profile = await this.studentService.findOneProfile(userId);
    return new ProfileResponse(profile);
  }

  @Post(':userId/profile')
  async createProfile(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() createStudentDto: CreateStudentProfileDTO,
  ) {
    const profile = await this.studentService.createProfile(userId, createStudentDto);
    return new ProfileResponse(profile);
  }

  @Put(':userId/profile')
  async updateProfile(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateStudentDto: UpdateStudentProfileDTO,
  ) {
    const profile = await this.studentService.updateProfile(userId, updateStudentDto);
    return new ProfileResponse(profile);
  }
}
