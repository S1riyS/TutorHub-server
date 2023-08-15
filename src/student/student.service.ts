import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentProfileDTO, UpdateStudentProfileDTO } from './dto';
import { PrismaService } from '@prisma/prisma.service';
import { UserService } from '@user/user.service';
import { Role } from '@prisma/client';

@Injectable()
export class StudentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createProfile(userId: string, dto: CreateStudentProfileDTO) {
    const candidate = await this.userService.findOne(userId);
    if (!candidate) throw new NotFoundException('User not found');
    if (candidate.role !== Role.STUDENT) throw new ForbiddenException();

    const profileExists = await this.prisma.studentProfile.findFirst({
      where: {
        userId: userId,
      },
    });
    if (profileExists) throw new BadRequestException('This user already has a profile');

    return this.prisma.studentProfile.create({
      data: {
        userId: userId,
        ...dto,
      },
    });
  }

  async findOneProfile(userId: string) {
    const profile = await this.prisma.studentProfile.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async updateProfile(userId: string, dto: UpdateStudentProfileDTO) {
    const candidate = await this.userService.findOne(userId);
    if (!candidate) throw new NotFoundException('User not found');

    const profileExists = await this.prisma.studentProfile.findFirst({
      where: {
        userId: userId,
      },
    });
    if (!profileExists) throw new BadRequestException('This user does not have a profile');

    return this.prisma.studentProfile.update({
      where: {
        userId: userId,
      },
      data: {
        ...dto,
      },
    });
  }
}
