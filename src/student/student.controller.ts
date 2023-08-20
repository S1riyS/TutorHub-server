import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentProfileDTO, UpdateStudentProfileDTO } from './dto';
import { StudentProfileResponse } from './responses';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser, Public } from '@common/decorators';
import {
  StudentCreateProfileSwaggerDecorator,
  StudentFindOneSwaggerDecorator,
  StudentUpdateProfileSwaggerDecorator,
} from '@common/decorators/swagger/';

@Controller('students')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get(':userId')
  @Public()
  @StudentFindOneSwaggerDecorator()
  async findOne(@Param('userId', ParseUUIDPipe) userId: string) {
    const profile = await this.studentService.findOneProfile(userId);
    return new StudentProfileResponse(profile);
  }

  @Post('self/profile')
  @HttpCode(HttpStatus.CREATED)
  @StudentCreateProfileSwaggerDecorator()
  async createProfile(@CurrentUser('id') userId: string, @Body() createStudentDto: CreateStudentProfileDTO) {
    const profile = await this.studentService.createProfile(userId, createStudentDto);
    return new StudentProfileResponse(profile);
  }

  @Put('self/profile')
  @StudentUpdateProfileSwaggerDecorator()
  async updateProfile(@CurrentUser('id') userId: string, @Body() updateStudentDto: UpdateStudentProfileDTO) {
    const profile = await this.studentService.updateProfile(userId, updateStudentDto);
    return new StudentProfileResponse(profile);
  }
}
