import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { User } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';
import { CreateUserDTO, UpdateUserDTO } from '@user/dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUserDTO): Promise<User> {
    const candidate = await this.findOne(user.email);
    if (candidate) throw new BadRequestException('User with this credentials already exists');

    const hashedPassword = await this.hashPassword(user.password);
    return this.prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  async update(id: string, user: UpdateUserDTO): Promise<User> {
    const candidate = await this.findOne(id);
    if (!candidate) throw new NotFoundException('User not found');

    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...user,
      },
    });
  }

  async findOne(idOrEmail: string): Promise<User | null> {
    const user = this.prisma.user.findFirst({
      where: {
        OR: [{ id: idOrEmail }, { email: idOrEmail }],
      },
    });
    if (!user) return null;
    return user;
  }

  async delete(id: string): Promise<{ [id: string]: string }> {
    //   TODO: add check if user tries to delete himself of it is admin
    return this.prisma.user.delete({
      where: {
        id: id,
      },
      select: {
        id: true,
      },
    });
  }

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const salt = await genSalt(saltOrRounds);
    return hash(password, salt);
  }
}
