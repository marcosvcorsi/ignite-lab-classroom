import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

type CreateStudentParams = {
  authUserId: string;
};

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

  async findByAuthUserId(authUserId: string) {
    return this.prisma.student.findUnique({
      where: {
        authUserId,
      },
    });
  }

  async create({ authUserId }: CreateStudentParams) {
    const existingStudent = await this.findByAuthUserId(authUserId);

    if (existingStudent) {
      throw new Error('Student already exists');
    }

    return this.prisma.student.create({
      data: {
        authUserId,
      },
    });
  }
}
