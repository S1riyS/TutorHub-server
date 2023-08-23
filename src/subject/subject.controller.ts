import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SubjectService } from '@subject/subject.service';
import { Role, Subject } from '@prisma/client';
import { FullSubjectResponse, SubjectResponse } from '@subject/responses';
import { CreateSubjectDTO, UpdateSubjectDTO } from '@subject/dto';
import { Public, Roles } from '@common/decorators';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get(':subjectId')
  @Public()
  async getOneSubject(@Param('subjectId') subjectId: string) {
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
  async updateSubject(@Param('subjectId') subjectId: string, @Body() dto: UpdateSubjectDTO) {
    const subject = await this.subjectService.updateSubject(subjectId, dto);
    return new SubjectResponse(subject);
  }

  @Delete(':subjectId')
  @Roles(Role.ADMIN)
  async deleteSubject(@Param('subjectId') subjectId: string) {
    return this.subjectService.deleteSubject(subjectId);
  }
}
