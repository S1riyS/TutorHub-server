import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentProfileDTO, UpdateStudentProfileDTO } from './dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get(':userId')
  findOne(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.studentService.findOne(userId);
  }

  @Post(':userId')
  createProfile(@Param('userId', ParseUUIDPipe) userId: string, @Body() createStudentDto: CreateStudentProfileDTO) {
    return this.studentService.create(userId, createStudentDto);
  }

  @Patch(':userId')
  updateProfile(@Param('userId', ParseUUIDPipe) userId: string, @Body() updateStudentDto: UpdateStudentProfileDTO) {
    return this.studentService.update(userId, updateStudentDto);
  }
}
