import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { User } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: Partial<User>): Promise<User> {
    const hashedPassword = await this.hashPassword(user.password);
    return this.prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {
        email: user.email,
        password: hashedPassword,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        phoneNumber: user.phoneNumber,
      },
      create: {
        email: user.email,
        password: hashedPassword,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        phoneNumber: user.phoneNumber,
        role: user.role,
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
