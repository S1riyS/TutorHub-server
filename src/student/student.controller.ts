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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('students')
@ApiTags('Students')
@UseInterceptors(ClassSerializerInterceptor)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get(':userId/profile')
  @ApiOperation({ summary: "Retrieves student's profile with given userID" })
  @ApiOkResponse({ type: StudentProfileResponse })
  @ApiNotFoundResponse({ description: 'Profile not found' })
  async findOne(@Param('userId', ParseUUIDPipe) userId: string) {
    const profile = await this.studentService.findOneProfile(userId);
    return new StudentProfileResponse(profile);
  }

  @Post(':userId/profile')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creates profile for student with given userID' })
  @ApiCreatedResponse({ type: StudentProfileResponse })
  @ApiBadRequestResponse({ description: 'This student already has a profile' })
  @ApiForbiddenResponse({ description: 'User is not student' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async createProfile(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() createStudentDto: CreateStudentProfileDTO,
  ) {
    const profile = await this.studentService.createProfile(userId, createStudentDto);
    return new StudentProfileResponse(profile);
  }

  @Put(':userId/profile')
  @ApiOperation({ summary: 'Updates profile of student with given userID' })
  @ApiOkResponse({ type: StudentProfileResponse })
  @ApiBadRequestResponse({ description: 'This user does not have a profile' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async updateProfile(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateStudentDto: UpdateStudentProfileDTO,
  ) {
    const profile = await this.studentService.updateProfile(userId, updateStudentDto);
    return new StudentProfileResponse(profile);
  }
}
