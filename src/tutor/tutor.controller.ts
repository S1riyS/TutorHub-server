import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { TutorService } from './tutor.service';
import { CreateAchievementDTO, UpdateAchievementDTO } from './dto';
import { AchievementResponse, DetailsResponse, FullTutorProfileResponse } from './responses';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser, Public, Roles } from '@common/decorators';
import {
  TutorAddAchievementSwaggerDecorator,
  TutorConfirmAchievementSwaggerDecorator,
  TutorDeleteAchievementSwaggerDecorator,
  TutorFindOneSwaggerDecorator,
  TutorToggleTeachingFormatSwaggerDecorator,
  TutorUpdateAchievementSwaggerDecorator,
  TutorUpdateDetailsSwaggerDecorator,
} from '@common/decorators/swagger';
import { Role, TeachingFormat } from '@prisma/client';
import { UpdateDetailsDTO } from '@tutor/dto/details.dto';

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

  @Patch('self/details')
  @Roles(Role.TUTOR)
  @TutorUpdateDetailsSwaggerDecorator()
  async updateDetails(@CurrentUser('id') userId: string, @Body() dto: UpdateDetailsDTO) {
    const details = await this.tutorService.updateDetails(userId, dto);
    return new DetailsResponse(details);
  }

  @Post('self/toggle-teaching-format')
  @Roles(Role.TUTOR)
  @TutorToggleTeachingFormatSwaggerDecorator()
  async toggleTeachingFormat(
    @CurrentUser('id') userId: string,
    @Query('format', new ParseEnumPipe(TeachingFormat)) format: TeachingFormat,
  ) {
    return this.tutorService.toggleTeachingFormat(userId, format);
  }

  @Post('self/achievements')
  @Roles(Role.TUTOR)
  @HttpCode(HttpStatus.CREATED)
  @TutorAddAchievementSwaggerDecorator()
  async addAchievement(@CurrentUser('id') userId: string, @Body() dto: CreateAchievementDTO) {
    const achievement = await this.tutorService.addAchievement(userId, dto);
    return new AchievementResponse(achievement);
  }

  @Patch('self/achievements/:achievementId')
  @Roles(Role.TUTOR)
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
  @Roles(Role.TUTOR)
  @TutorDeleteAchievementSwaggerDecorator()
  async deleteAchievement(
    @CurrentUser('id') userId: string,
    @Param('achievementId', ParseUUIDPipe) achievementId: string,
  ) {
    return this.tutorService.deleteAchievement(userId, achievementId);
  }

  @Patch(':userId/achievements/:achievementId/confirm')
  @Roles(Role.ADMIN)
  @TutorConfirmAchievementSwaggerDecorator()
  async confirmAchievement(
    @Param('achievementId', ParseUUIDPipe) achievementId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    const achievement = await this.tutorService.confirmAchievement(userId, achievementId);
    return new AchievementResponse(achievement);
  }
}
