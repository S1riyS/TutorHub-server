import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { TutorService } from './tutor.service';
import { CreateAchievementDTO, CreateTutorProfileDTO, UpdateTutorProfileDTO } from './dto';
import { AchievementResponse, TutorProfileResponse } from './responses';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('tutors')
@ApiTags('Tutors')
@UseInterceptors(ClassSerializerInterceptor)
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Get(':userId')
  @ApiOperation({ summary: "Retrieves tutor's profile with given userID" })
  @ApiOkResponse({ type: TutorProfileResponse })
  @ApiNotFoundResponse({ description: 'User not found' })
  async findOne(@Param('userId', ParseUUIDPipe) userId: string) {
    const profile = await this.tutorService.findOneProfile(userId);
    return new TutorProfileResponse(profile);
  }

  @Post(':userId/profile')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creates profile for tutor with given userID' })
  @ApiCreatedResponse({ type: TutorProfileResponse })
  @ApiBadRequestResponse({ description: 'This tutor already has a profile' })
  @ApiForbiddenResponse({ description: 'User is not tutor' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async createProfile(@Param('userId', ParseUUIDPipe) userId: string, @Body() dto: CreateTutorProfileDTO) {
    const profile = await this.tutorService.createProfile(userId, dto);
    return new TutorProfileResponse(profile);
  }

  @Put(':userId/profile')
  @ApiOperation({ summary: 'Updates profile of tutor with given userID' })
  @ApiOkResponse({ type: TutorProfileResponse })
  @ApiBadRequestResponse({ description: 'This user does not have a profile' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async updateProfile(@Param('userId', ParseUUIDPipe) userId: string, @Body() dto: UpdateTutorProfileDTO) {
    const updatedProfile = await this.tutorService.updateProfile(userId, dto);
    return new TutorProfileResponse(updatedProfile);
  }

  // @Post(':userId/education')
  // @HttpCode(HttpStatus.CREATED)
  // @ApiOperation({ summary: 'Creates record about education for tutor with given userID' })
  // @ApiCreatedResponse({ type: EducationResponse })
  // @ApiNotFoundResponse({ description: "Tutor's profile not found" })
  // async createEducation(@Param('userId', ParseUUIDPipe) userId: string, @Body() dto: CreateEducationDTO) {
  //   const educationRecord = await this.tutorService.createEducation(userId, dto);
  //   return new EducationResponse(educationRecord);
  // }
  //
  // @Put(':userId/education/:educationId')
  // @ApiOperation({ summary: 'Updates record about education for tutor with given userID' })
  // @ApiCreatedResponse({ type: EducationResponse })
  // @ApiBadRequestResponse({ description: 'This tutor does not have such a record' })
  // @ApiNotFoundResponse({ description: "Tutor's profile not found" })
  // async updateEducation(
  //   @Param('userId', ParseUUIDPipe) userId: string,
  //   @Param('educationId', ParseUUIDPipe) educationId: string,
  //   @Body() dto: UpdateEducationDTO,
  // ) {
  //   const updatedEducationRecord = await this.tutorService.updateEducation(userId, educationId, dto);
  //   return new EducationResponse(updatedEducationRecord);
  // }
  //
  // @Post(':userId/experience')
  // @HttpCode(HttpStatus.CREATED)
  // @ApiOperation({ summary: 'Creates record about experience for tutor with given userID' })
  // @ApiCreatedResponse({ type: ExperienceResponse })
  // @ApiNotFoundResponse({ description: "Tutor's profile not found" })
  // async createExperience(@Param('userId', ParseUUIDPipe) userId: string, @Body() dto: CreateExperienceDTO) {
  //   const experienceRecord = await this.tutorService.createExperience(userId, dto);
  //   return new ExperienceResponse(experienceRecord);
  // }
  //
  // @Put(':userId/experience/:experienceId')
  // @ApiOperation({ summary: 'Updates record about experience for tutor with given userID' })
  // @ApiCreatedResponse({ type: ExperienceResponse })
  // @ApiBadRequestResponse({ description: 'This tutor does not have such a record' })
  // @ApiNotFoundResponse({ description: "Tutor's profile not found" })
  // async updateExperience(
  //   @Param('userId', ParseUUIDPipe) userId: string,
  //   @Param('experienceId', ParseUUIDPipe) experienceId: string,
  //   @Body() dto: UpdateExperienceDTO,
  // ) {
  //   const updatedExperienceRecord = await this.tutorService.updateExperience(userId, experienceId, dto);
  //   return new ExperienceResponse(updatedExperienceRecord);
  // }

  @Post(':userId/achievements')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Creates achievement for tutor with given userId' })
  @ApiCreatedResponse({ type: AchievementResponse })
  @ApiNotFoundResponse({ description: "Tutor's profile not found" })
  async addAchievement(@Param('userId', ParseUUIDPipe) userId: string, @Body() dto: CreateAchievementDTO) {
    const achievement = await this.tutorService.addAchievement(userId, dto);
    return new AchievementResponse(achievement);
  }

  @Put(':userId/achievements/:achievementId')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Updates achievement for tutor with given userId' })
  @ApiOkResponse({ type: AchievementResponse })
  @ApiForbiddenResponse({ description: 'Confirmed achievement can not be updated' })
  @ApiNotFoundResponse({ description: "Tutor's profile not found or This tutor does not have such an achievement" })
  async updateAchievement(
    @Param('achievementId', ParseUUIDPipe) achievementId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() dto: CreateAchievementDTO,
  ) {
    const achievement = await this.tutorService.updateAchievement(userId, achievementId, dto);
    return new AchievementResponse(achievement);
  }

  @Delete(':userId/achievements/:achievementId')
  @ApiOperation({ summary: 'Deletes achievement' })
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: "Tutor's profile not found or This tutor does not have such an achievement" })
  async deleteAchievement(
    @Param('achievementId', ParseUUIDPipe) achievementId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    return this.tutorService.deleteAchievement(userId, achievementId);
  }

  @Put(':userId/achievements/:achievementId/confirm')
  @ApiOperation({ summary: 'Sets isConfirmed field of achievement to TRUE' })
  @ApiOkResponse({ type: AchievementResponse })
  @ApiNotFoundResponse({ description: "Tutor's profile not found or This tutor does not have such an achievement" })
  async confirmAchievement(
    @Param('achievementId', ParseUUIDPipe) achievementId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    const achievement = await this.tutorService.confirmAchievement(userId, achievementId);
    return new AchievementResponse(achievement);
  }
}
