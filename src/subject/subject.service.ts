import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Subject, Topic } from '@prisma/client';
import { CreateSubjectDTO, UpdateSubjectDTO } from '@subject/dto';
import { DeleteResponse } from '@common/responses';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {}

  async getOne(subjectIdOrName: string, throwWhenNotFound = false): Promise<Subject & { topics: Topic[] }> {
    const subject = await this.prisma.subject.findFirst({
      where: {
        OR: [{ id: subjectIdOrName }, { name: subjectIdOrName }],
      },
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

  async createSubject(dto: CreateSubjectDTO): Promise<Subject> {
    const candidate = await this.getOne(dto.name);
    if (candidate) throw new BadRequestException('Subject with this name already exists');

    return this.prisma.subject.create({
      data: { ...dto },
    });
  }

  async updateSubject(subjectId: string, dto: UpdateSubjectDTO): Promise<Subject> {
    await this.getOne(subjectId, true);

    return this.prisma.subject.update({
      where: { id: subjectId },
      data: { ...dto },
    });
  }

  async deleteSubject(subjectId: string): Promise<DeleteResponse> {
    return this.prisma.subject.delete({
      where: { id: subjectId },
      select: { id: true },
    });
  }
}
