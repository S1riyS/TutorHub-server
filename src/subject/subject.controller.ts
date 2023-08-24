import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { SubjectService } from '@subject/subject.service';
import { Role, Subject, Topic } from '@prisma/client';
import { FullSubjectResponse, SubjectResponse, TopicResponse } from '@subject/responses';
import { CreateSubjectDTO, CreateTopicDTO, UpdateSubjectDTO, UpdateTopicDTO } from '@subject/dto';
import { Public, Roles } from '@common/decorators';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get(':subjectId')
  @Public()
  async getOneSubject(@Param('subjectId', ParseUUIDPipe) subjectId: string) {
    const subject = await this.subjectService.getOneSubject(subjectId);
    return new FullSubjectResponse(subject);
  }

  @Get()
  @Public()
  async getAllSubject() {
    const subjects = await this.subjectService.getAllSubjects();
    return subjects.map((subject: Subject) => new SubjectResponse(subject));
  }

  @Post()
  @Roles(Role.ADMIN)
  async addSubject(@Body() dto: CreateSubjectDTO) {
    const subject = await this.subjectService.createSubject(dto);
    return new SubjectResponse(subject);
  }

  @Patch(':subjectId')
  @Roles(Role.ADMIN)
  async updateSubject(@Param('subjectId', ParseUUIDPipe) subjectId: string, @Body() dto: UpdateSubjectDTO) {
    const subject = await this.subjectService.updateSubject(subjectId, dto);
    return new SubjectResponse(subject);
  }

  @Delete(':subjectId')
  @Roles(Role.ADMIN)
  async deleteSubject(@Param('subjectId', ParseUUIDPipe) subjectId: string) {
    return this.subjectService.deleteSubject(subjectId);
  }

  @Get(':subjectId/topics/:topicId')
  async getOneTopic(
    @Param('subjectId', ParseUUIDPipe) subjectId: string,
    @Param('topicId', ParseUUIDPipe) topicId: string,
  ) {
    const topic = await this.subjectService.getOneTopic(subjectId, topicId);
    return new TopicResponse(topic);
  }

  @Get(':subjectId/topics')
  async getAllTopicsOfSubject(@Param('subjectId', ParseUUIDPipe) subjectId: string) {
    const topics = await this.subjectService.getAllTopicsOfSubject(subjectId);
    return topics.map((topic: Topic) => new SubjectResponse(topic));
  }

  @Post(':subjectId/topics')
  async createTopic(@Param('subjectId', ParseUUIDPipe) subjectId: string, @Body() dto: CreateTopicDTO) {
    const topic = await this.subjectService.createTopic(subjectId, dto);
    return new TopicResponse(topic);
  }

  @Patch(':subjectId/topics/:topicId')
  async updateTopic(
    @Param('subjectId', ParseUUIDPipe) subjectId: string,
    @Param('topicId', ParseUUIDPipe) topicId: string,
    @Body() dto: UpdateTopicDTO,
  ) {
    const topic = await this.subjectService.updateTopic(subjectId, topicId, dto);
    return new TopicResponse(topic);
  }

  @Delete(':subjectId/topics/:topicId')
  async deleteTopic(
    @Param('subjectId', ParseUUIDPipe) subjectId: string,
    @Param('topicId', ParseUUIDPipe) topicId: string,
  ) {
    return this.subjectService.deleteTopic(subjectId, topicId);
  }
}
