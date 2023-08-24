import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Subject, Topic } from '@prisma/client';
import { CreateSubjectDTO, CreateTopicDTO, UpdateSubjectDTO, UpdateTopicDTO } from '@subject/dto';
import { DeleteResponse } from '@common/responses';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {}

  async getOneSubject(subjectIdOrName: string, throwWhenNotFound = false): Promise<Subject & { topics: Topic[] }> {
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

  async getAllSubjects(): Promise<Subject[]> {
    return this.prisma.subject.findMany();
  }

  async createSubject(dto: CreateSubjectDTO): Promise<Subject> {
    const candidate = await this.getOneSubject(dto.name);
    if (candidate) throw new BadRequestException('Subject with this name already exists');

    return this.prisma.subject.create({
      data: { ...dto },
    });
  }

  async updateSubject(subjectId: string, dto: UpdateSubjectDTO): Promise<Subject> {
    await this.getOneSubject(subjectId, true);

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

  async getOneTopic(subjectId: string, topicId: string, throwWhenNotFound = false): Promise<Topic> {
    const topic = await this.prisma.topic.findFirst({
      where: { AND: [{ subjectId: subjectId, id: topicId }] },
    });

    if (!topic) {
      if (throwWhenNotFound) throw new NotFoundException('Topic not found');
      return null;
    }

    return topic;
  }

  async getAllTopicsOfSubject(subjectId: string): Promise<Topic[]> {
    return this.prisma.topic.findMany({
      where: { subjectId: subjectId },
    });
  }

  async createTopic(subjectId: string, dto: CreateTopicDTO): Promise<Topic> {
    await this.validateTopicName(subjectId, dto.name);

    return this.prisma.topic.create({
      data: { subjectId: subjectId, ...dto },
    });
  }

  async updateTopic(subjectId: string, topicId: string, dto: UpdateTopicDTO): Promise<Topic> {
    // Checking provided data
    await Promise.all([this.getOneTopic(subjectId, topicId, true), this.validateTopicName(subjectId, dto.name)]);

    return this.prisma.topic.update({
      where: { id: topicId },
      data: { ...dto },
    });
  }

  async deleteTopic(subjectId: string, topicId: string): Promise<DeleteResponse> {
    await this.getOneTopic(subjectId, topicId, true);

    return this.prisma.topic.delete({
      where: { id: topicId },
      select: { id: true },
    });
  }

  private async validateTopicName(subjectId: string, topicName: string): Promise<void> {
    const topics = await this.getAllTopicsOfSubject(subjectId);
    const topicsNames = topics.map((topic: Topic) => topic.name);
    if (topicsNames.includes(topicName)) throw new ConflictException('Invalid topic name within this subject');
  }
}
