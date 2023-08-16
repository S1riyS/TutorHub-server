import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { UserService } from '@user/user.service';
import {
  CreateEducationDTO,
  CreateExperienceDTO,
  CreateTutorProfileDTO,
  UpdateEducationDTO,
  UpdateExperienceDTO,
  UpdateTutorProfileDTO,
} from './dto';
import { Role } from '@prisma/client';

@Injectable()
export class TutorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async findOneProfile(userId) {
    const profile = await this.prisma.tutorProfile.findUnique({
      where: {
        userId: userId,
      },
      include: {
        education: true,
        experience: true,
      },
    });

    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async createProfile(userId: string, dto: CreateTutorProfileDTO) {
    const candidate = await this.userService.findOne(userId);
    if (!candidate) throw new NotFoundException('User not found');
    if (candidate.role !== Role.TUTOR) throw new ForbiddenException();

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
    const candidate = await this.userService.findOne(userId);
    if (!candidate) throw new NotFoundException('User not found');

    const profileExists = await this.prisma.tutorProfile.findFirst({
      where: {
        userId: userId,
      },
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

  async createEducation(userId: string, dto: CreateEducationDTO) {
    const profile = await this.prisma.tutorProfile.findUnique({
      where: { userId: userId },
      select: { id: true },
    });
    if (!profile) throw new NotFoundException("User's profile not found");

    return this.prisma.tutorEducation.create({
      data: {
        tutorProfileId: profile.id,
        ...dto,
      },
    });
  }

  async updateEducation(userId: string, educationId: string, dto: UpdateEducationDTO) {
    const profile = await this.prisma.tutorProfile.findUnique({
      where: { userId: userId },
      select: { id: true },
    });
    if (!profile) throw new NotFoundException("User's profile not found");

    return this.prisma.tutorEducation
      .update({
        where: {
          id: educationId,
          tutorProfileId: profile.id,
        },
        data: {
          ...dto,
        },
      })
      .catch(() => {
        throw new BadRequestException('This tutor does not have such a record');
      });
  }

  async createExperience(userId: string, dto: CreateExperienceDTO) {
    const profile = await this.prisma.tutorProfile.findUnique({
      where: { userId: userId },
      select: { id: true },
    });
    if (!profile) throw new NotFoundException("User's profile not found");

    return this.prisma.tutorExperince.create({
      data: {
        tutorProfileId: profile.id,
        ...dto,
      },
    });
  }

  async updateExperience(userId: string, experienceId: string, dto: UpdateExperienceDTO) {
    const profile = await this.prisma.tutorProfile.findUnique({
      where: { userId: userId },
      select: { id: true },
    });
    if (!profile) throw new NotFoundException("User's profile not found");

    return this.prisma.tutorExperince
      .update({
        where: {
          id: experienceId,
          tutorProfileId: profile.id,
        },
        data: {
          ...dto,
        },
      })
      .catch(() => {
        throw new BadRequestException('This tutor does not have such a record');
      });
  }
}
