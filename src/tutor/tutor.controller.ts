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
import { CurrentUser, Public } from '@common/decorators';
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

  @Post('self/profile')
  @HttpCode(HttpStatus.CREATED)
  @TutorCreateProfileSwaggerDecorator()
  async createProfile(@CurrentUser('id') userId: string, @Body() dto: CreateTutorProfileDTO) {
    const profile = await this.tutorService.createProfile(userId, dto);
    return new TutorProfileResponse(profile);
  }

  @Put('self/profile')
  @TutorUpdateProfileSwaggerDecorator()
  async updateProfile(@CurrentUser('id') userId: string, @Body() dto: UpdateTutorProfileDTO) {
    const updatedProfile = await this.tutorService.updateProfile(userId, dto);
    return new TutorProfileResponse(updatedProfile);
  }

  @Post('self/achievements')
  @HttpCode(HttpStatus.CREATED)
  @TutorAddAchievementSwaggerDecorator()
  async addAchievement(@CurrentUser('id') userId: string, @Body() dto: CreateAchievementDTO) {
    const achievement = await this.tutorService.addAchievement(userId, dto);
    return new AchievementResponse(achievement);
  }

  @Put('self/achievements/:achievementId')
  @TutorUpdateAchievementSwaggerDecorator()
  async updateAchievement(
    @Param('achievementId', ParseUUIDPipe) achievementId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateAchievementDTO,
  ) {
    const achievement = await this.tutorService.updateAchievement(userId, achievementId, dto);
    return new AchievementResponse(achievement);
  }

  @Delete('self/achievements/:achievementId')
  @TutorDeleteAchievementSwaggerDecorator()
  async deleteAchievement(
    @CurrentUser('id') userId: string,
    @Param('achievementId', ParseUUIDPipe) achievementId: string,
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
