import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { UserService } from '@user/user.service';
import { CreateAchievementDTO, CreateTutorProfileDTO, UpdateAchievementDTO, UpdateTutorProfileDTO } from './dto';
import { TutorAchievement, TutorProfile } from '@prisma/client';

@Injectable()
export class TutorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async findOneProfile(userId) {
    const profile = await this.prisma.tutorProfile.findUnique({
      where: { userId: userId },
      include: { achievements: true },
    });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async createProfile(userId: string, dto: CreateTutorProfileDTO) {
    const candidate = await this.userService.findOne(userId);
    if (!candidate) throw new NotFoundException('User not found');

    const profileExists = await this.prisma.tutorProfile.findFirst({
      where: {
        userId: userId,
      },
    });
    if (profileExists) throw new BadRequestException('This user already has a profile');

    return this.prisma.tutorProfile.create({
      data: {
        userId: userId,
        ...dto,
      },
    });
  }

  async updateProfile(userId: string, dto: UpdateTutorProfileDTO) {
    // Checking if user exists
    await this.userService.findOne(userId, true);

    // Checking if user has tutor profile
    const profileExists = await this.prisma.tutorProfile.findFirst({
      where: { userId: userId },
    });
    if (!profileExists) throw new BadRequestException('This user does not have a profile');

    return this.prisma.tutorProfile.update({
      where: {
        userId: userId,
      },
      data: {
        ...dto,
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
