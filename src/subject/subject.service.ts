import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Subject, Topic } from '@prisma/client';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {}

  async getOne(subjectId: string, throwWhenNotFound = false): Promise<Subject & { topics: Topic[] }> {
    const subject = await this.prisma.subject.findUnique({
      where: { id: subjectId },
      include: { topics: true },
    });

    if (!subject) {
      if (throwWhenNotFound) throw new NotFoundException('Subject not found');
      return null;
    }
    return subject;
  }

  async getAll(): Promise<Subject[]> {
    return this.prisma.subject.findMany();
  }
}
