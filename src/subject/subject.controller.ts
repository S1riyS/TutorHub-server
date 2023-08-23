import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SubjectService } from '@subject/subject.service';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get(':subjectId')
  getOne(@Param('subjectId') subjectId: string) {
    return this.subjectService.getOne(subjectId);
  }

  @Get()
  getAll() {
    return this.subjectService.getAll();
  }

  @Post()
  add(dto) {}

  @Patch(':subjectId')
  update(@Param('subjectId') subjectId: string, dto) {}

  @Delete(':subjectId')
  delete(@Param('subjectId') subjectId: string) {}
}
