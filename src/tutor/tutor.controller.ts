import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { TutorService } from './tutor.service';
import {
  CreateEducationDTO,
  CreateExperienceDTO,
  CreateTutorProfileDTO,
  UpdateEducationDTO,
  UpdateExperienceDTO,
  UpdateTutorProfileDTO,
} from './dto';

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
  async createEducation(@Param('userId', ParseUUIDPipe) userId: string, @Body() dto: CreateEducationDTO) {
    return this.tutorService.createEducation(userId, dto);
  }

  @Put(':userId/education/:educationId')
  async updateEducation(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('educationId', ParseUUIDPipe) educationId: string,
    @Body() dto: UpdateEducationDTO,
  ) {
    return this.tutorService.updateEducation(userId, educationId, dto);
  }

  @Post(':userId/experience')
  async createExperience(@Param('userId', ParseUUIDPipe) userId: string, @Body() dto: CreateExperienceDTO) {
    return this.tutorService.createExperience(userId, dto);
  }

  @Put(':userId/experience/:experienceId')
  async updateExperience(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('experienceId', ParseUUIDPipe) experienceId: string,
    @Body() dto: UpdateExperienceDTO,
  ) {
    return this.tutorService.updateExperience(userId, experienceId, dto);
  }
}
