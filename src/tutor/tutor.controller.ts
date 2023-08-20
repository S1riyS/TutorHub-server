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
import { CreateAchievementDTO, CreateTutorProfileDTO, UpdateAchievementDTO, UpdateTutorProfileDTO } from './dto';
import { AchievementResponse, FullTutorProfileResponse, TutorProfileResponse } from './responses';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@common/decorators';
import {
  TutorAddAchievementSwaggerDecorator,
  TutorConfirmAchievementSwaggerDecorator,
  TutorCreateProfileSwaggerDecorator,
  TutorDeleteAchievementSwaggerDecorator,
  TutorFindOneSwaggerDecorator,
  TutorUpdateAchievementSwaggerDecorator,
  TutorUpdateProfileSwaggerDecorator,
} from '@common/decorators/swagger';

@Controller('tutors')
@ApiTags('Tutors')
@UseInterceptors(ClassSerializerInterceptor)
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Get(':userId')
  @Public()
  @TutorFindOneSwaggerDecorator()
  async findOne(@Param('userId', ParseUUIDPipe) userId: string) {
    const profile = await this.tutorService.findOneProfile(userId);
    return new FullTutorProfileResponse(profile);
  }

  @Post(':userId/profile')
  @HttpCode(HttpStatus.CREATED)
  @TutorCreateProfileSwaggerDecorator()
  async createProfile(@Param('userId', ParseUUIDPipe) userId: string, @Body() dto: CreateTutorProfileDTO) {
    const profile = await this.tutorService.createProfile(userId, dto);
    return new TutorProfileResponse(profile);
  }

  @Put(':userId/profile')
  @TutorUpdateProfileSwaggerDecorator()
  async updateProfile(@Param('userId', ParseUUIDPipe) userId: string, @Body() dto: UpdateTutorProfileDTO) {
    const updatedProfile = await this.tutorService.updateProfile(userId, dto);
    return new TutorProfileResponse(updatedProfile);
  }

  @Post(':userId/achievements')
  @HttpCode(HttpStatus.CREATED)
  @TutorAddAchievementSwaggerDecorator()
  async addAchievement(@Param('userId', ParseUUIDPipe) userId: string, @Body() dto: CreateAchievementDTO) {
    const achievement = await this.tutorService.addAchievement(userId, dto);
    return new AchievementResponse(achievement);
  }

  @Put(':userId/achievements/:achievementId')
  @TutorUpdateAchievementSwaggerDecorator()
  async updateAchievement(
    @Param('achievementId', ParseUUIDPipe) achievementId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() dto: UpdateAchievementDTO,
  ) {
    const achievement = await this.tutorService.updateAchievement(userId, achievementId, dto);
    return new AchievementResponse(achievement);
  }

  @Delete(':userId/achievements/:achievementId')
  @TutorDeleteAchievementSwaggerDecorator()
  async deleteAchievement(
    @Param('achievementId', ParseUUIDPipe) achievementId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    return this.tutorService.deleteAchievement(userId, achievementId);
  }

  @Put(':userId/achievements/:achievementId/confirm')
  @TutorConfirmAchievementSwaggerDecorator()
  async confirmAchievement(
    @Param('achievementId', ParseUUIDPipe) achievementId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    const achievement = await this.tutorService.confirmAchievement(userId, achievementId);
    return new AchievementResponse(achievement);
  }
}
