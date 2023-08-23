import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SubjectService } from '@subject/subject.service';
import { Subject } from '@prisma/client';
import { FullSubjectResponse, SubjectResponse } from '@subject/responses';
import { CreateSubjectDTO, UpdateSubjectDTO } from '@subject/dto';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get(':subjectId')
  async getOne(@Param('subjectId') subjectId: string) {
    const subject = await this.subjectService.getOne(subjectId);
    return new FullSubjectResponse(subject);
  }

  @Get()
  async getAll() {
    const subjects = await this.subjectService.getAll();
    return subjects.map((subject: Subject) => new SubjectResponse(subject));
  }

  @Post()
  async add(dto: CreateSubjectDTO) {
    const subject = await this.subjectService.createSubject(dto);
    return new SubjectResponse(subject);
  }

  @Patch(':subjectId')
  async update(@Param('subjectId') subjectId: string, dto: UpdateSubjectDTO) {
    const subject = await this.subjectService.updateSubject(subjectId, dto);
    return new SubjectResponse(subject);
  }

  @Delete(':subjectId')
  async delete(@Param('subjectId') subjectId: string) {
    return this.subjectService.deleteSubject(subjectId);
  }
}
