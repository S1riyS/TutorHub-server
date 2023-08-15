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
import { TutorService } from './tutor.service';
import {
  CreateEducationDTO,
  CreateExperienceDTO,
  CreateTutorProfileDTO,
  UpdateEducationDTO,
  UpdateExperienceDTO,
  UpdateTutorProfileDTO,
} from './dto';
import { EducationResponse, ExperienceResponse } from './responses';

@Controller('tutors')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Get(':userId')
  async findOne(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.tutorService.findOneProfile(userId);
  }

  @Post(':userId/profile')
  async createProfile(@Param('userId', ParseUUIDPipe) userId: string, @Body() dto: CreateTutorProfileDTO) {
    return this.tutorService.createProfile(userId, dto);
  }

  @Put(':userId/profile')
  async updateProfile(@Param('userId', ParseUUIDPipe) userId: string, @Body() dto: UpdateTutorProfileDTO) {
    return this.tutorService.updateProfile(userId, dto);
  }

  @Post(':userId/education')
  @UseInterceptors(ClassSerializerInterceptor)
  async createEducation(@Param('userId', ParseUUIDPipe) userId: string, @Body() dto: CreateEducationDTO) {
    const educationRecord = await this.tutorService.createEducation(userId, dto);
    return new EducationResponse(educationRecord);
  }

  @Put(':userId/education/:educationId')
  @UseInterceptors(ClassSerializerInterceptor)
  async updateEducation(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('educationId', ParseUUIDPipe) educationId: string,
    @Body() dto: UpdateEducationDTO,
  ) {
    const updatedEducationRecord = await this.tutorService.updateEducation(userId, educationId, dto);
    return new EducationResponse(updatedEducationRecord);
  }

  @Post(':userId/experience')
  @UseInterceptors(ClassSerializerInterceptor)
  async createExperience(@Param('userId', ParseUUIDPipe) userId: string, @Body() dto: CreateExperienceDTO) {
    const experienceRecord = await this.tutorService.createExperience(userId, dto);
    return new ExperienceResponse(experienceRecord);
  }

  @Put(':userId/experience/:experienceId')
  @UseInterceptors(ClassSerializerInterceptor)
  async updateExperience(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('experienceId', ParseUUIDPipe) experienceId: string,
    @Body() dto: UpdateExperienceDTO,
  ) {
    const updatedExperienceRecord = await this.tutorService.updateExperience(userId, experienceId, dto);
    return new ExperienceResponse(updatedExperienceRecord);
  }
}
