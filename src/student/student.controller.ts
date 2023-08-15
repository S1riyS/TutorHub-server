import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentProfileDTO, UpdateStudentProfileDTO } from './dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get(':userId/profile')
  findOne(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.studentService.findOneProfile(userId);
  }

  @Post(':userId/profile')
  createProfile(@Param('userId', ParseUUIDPipe) userId: string, @Body() createStudentDto: CreateStudentProfileDTO) {
    return this.studentService.createProfile(userId, createStudentDto);
  }

  @Put(':userId/profile')
  updateProfile(@Param('userId', ParseUUIDPipe) userId: string, @Body() updateStudentDto: UpdateStudentProfileDTO) {
    return this.studentService.updateProfile(userId, updateStudentDto);
  }
}
