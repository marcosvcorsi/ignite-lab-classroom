import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

type CreateEnrollmentParams = {
  courseId: string;
  studentId: string;
};

@Injectable()
export class EnrollmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByStudentId(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByCourseIdAndStudentId(courseId: string, studentId: string) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      },
    });
  }

  async create({ courseId, studentId }: CreateEnrollmentParams) {
    const existingEnrollment = await this.findByCourseIdAndStudentId(
      courseId,
      studentId,
    );

    if (existingEnrollment) {
      throw new Error('Enrollment already exists');
    }

    return this.prisma.enrollment.create({
      data: {
        courseId,
        studentId,
      },
    });
  }
}
