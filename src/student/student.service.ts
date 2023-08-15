import { Injectable } from '@nestjs/common';
import { CreateStudentProfileDTO, UpdateStudentProfileDTO } from './dto';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, dto: CreateStudentProfileDTO) {}

  findOne(userId: string) {}

  update(userId: string, dto: UpdateStudentProfileDTO) {}
}
