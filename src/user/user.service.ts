import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';
import { CreateUserDTO, UpdateUserDTO } from '@user/dto';
import { DeleteResponse } from '@user/responses';
import { JwtPayload } from '@auth/interfaces';
import { TutorService } from '@tutor/tutor.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tutorService: TutorService,
  ) {}

  async create(user: CreateUserDTO): Promise<User> {
    const candidate = await this.findOne(user.email);
    if (candidate) throw new BadRequestException('User with this credentials already exists');

    const hashedPassword = await this.hashPassword(user.password);
    const newUser = await this.prisma.user.create({
      data: { ...user, password: hashedPassword },
    });

    // Creating profile for tutor
    if (user.role === Role.TUTOR) await this.tutorService.createProfile(newUser.id);

    return newUser;
  }

  async update(id: string, user: UpdateUserDTO): Promise<User> {
    // Trying to find a user to update
    await this.findOne(id, true);

    return this.prisma.user.update({
      where: { id: id },
      data: { ...user },
    });
  }

  async findOne(idOrEmail: string, throwWhenNotFound = false): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ id: idOrEmail }, { email: idOrEmail }],
      },
    });

    if (!user) {
      if (throwWhenNotFound) throw new NotFoundException('User not found');
      return null;
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async delete(id: string, currentUser: JwtPayload): Promise<DeleteResponse> {
    if (currentUser.id !== id || currentUser.role !== Role.ADMIN) {
      throw new ForbiddenException("User can't be deleted");
    }

    return this.prisma.user.delete({
      where: { id: id },
      select: { id: true },
    });
  }

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const salt = await genSalt(saltOrRounds);
    return hash(password, salt);
  }
}
