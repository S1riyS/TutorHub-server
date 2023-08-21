import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateAchievementDTO, UpdateAchievementDTO, UpdateDetailsDTO } from './dto';
import { TeachingFormat, TutorAchievement, TutorDetails, TutorProfile } from '@prisma/client';
import { toggleArrayValue } from '@common/utils';

@Injectable()
export class TutorService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneProfile(userId: string): Promise<TutorProfile | null> {
    return this.prisma.tutorProfile.findUnique({
      where: { userId: userId },
      include: { achievements: true, details: true },
    });
  }

  async createProfile(userId: string): Promise<TutorProfile> {
    return this.prisma.tutorProfile.create({
      data: {
        userId: userId,
        details: {
          create: {},
        },
      },
    });
  }

  async updateDetails(userId: string, dto: UpdateDetailsDTO): Promise<TutorDetails> {
    const profile = await this.checkUserProfileRelation(userId);
    return this.prisma.tutorDetails.update({
      where: { profileId: profile.id },
      data: { ...dto },
    });
  }

  async toggleTeachingFormat(userId: string, format: TeachingFormat): Promise<TeachingFormat[]> {
    const profile = await this.prisma.tutorProfile.findUnique({
      where: { userId: userId },
      select: { teachingFormats: true },
    });

    const updatedTeachingFormats = toggleArrayValue<TeachingFormat>(profile.teachingFormats, format);
    await this.prisma.tutorProfile.update({
      where: { userId: userId },
      data: { teachingFormats: updatedTeachingFormats },
    });

    return updatedTeachingFormats;
  }

  async addAchievement(userId: string, dto: CreateAchievementDTO): Promise<TutorAchievement> {
    const profile = await this.checkUserProfileRelation(userId);

    return this.prisma.tutorAchievement.create({
      data: {
        tutorProfileId: profile.id,
        ...dto,
      },
    });
  }

  async updateAchievement(userId: string, achievementId: string, dto: UpdateAchievementDTO): Promise<TutorAchievement> {
    const profile = await this.checkUserProfileRelation(userId);
    const achievement = await this.checkProfileAchievementRelation(profile.id, achievementId);
    if (achievement.isConfirmed) throw new ForbiddenException('Confirmed achievement can not be updated');

    return this.prisma.tutorAchievement.update({
      where: { id: achievementId },
      data: { ...dto },
    });
  }

  async deleteAchievement(userId: string, achievementId: string) {
    const profile = await this.checkUserProfileRelation(userId);
    await this.checkProfileAchievementRelation(profile.id, achievementId);

    return this.prisma.tutorAchievement.delete({
      where: { id: achievementId },
      select: { id: true },
    });
  }

  async confirmAchievement(userId: string, achievementId: string): Promise<TutorAchievement> {
    const profile = await this.checkUserProfileRelation(userId);
    await this.checkProfileAchievementRelation(profile.id, achievementId);

    return this.prisma.tutorAchievement.update({
      where: { id: achievementId },
      data: { isConfirmed: true },
    });
  }

  private async checkUserProfileRelation(userId: string): Promise<TutorProfile> {
    const profile = await this.prisma.tutorProfile.findUnique({
      where: { userId: userId },
    });
    if (!profile) throw new NotFoundException("Tutor's profile not found");
    return profile;
  }

  private async checkProfileAchievementRelation(profileId: string, achievementId: string): Promise<TutorAchievement> {
    const achievement = await this.prisma.tutorAchievement.findUnique({
      where: {
        id: achievementId,
        tutorProfileId: profileId,
      },
    });
    if (!achievement) throw new NotFoundException('This tutor does not have such an achievement');
    return achievement;
  }
}
