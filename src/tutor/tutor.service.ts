import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateAchievementDTO, UpdateAchievementDTO } from './dto';
import { TutorAchievement, TutorProfile } from '@prisma/client';

@Injectable()
export class TutorService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneProfile(userId: string, throwWhenNotFound: boolean = false): Promise<TutorProfile | null> {
    const profile = await this.prisma.tutorProfile.findUnique({
      where: { userId: userId },
      include: { achievements: true, details: true },
    });
    if (!profile) {
      if (throwWhenNotFound) throw new NotFoundException('Profile not found');
      return null;
    }
    return profile;
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
