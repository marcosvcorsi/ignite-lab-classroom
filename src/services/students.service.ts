import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.student.findMany();
  }

  async findById(id: string) {
    return this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }
}
