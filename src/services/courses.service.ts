import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../database/prisma/prisma.service';

type CreateCourseParams = {
  title: string;
  slug?: string;
};

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.course.findMany();
  }

  async findById(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.course.findUnique({
      where: {
        slug,
      },
    });
  }

  async create({
    title,
    slug = slugify(title, { lower: true }),
  }: CreateCourseParams) {
    const existingCourse = await this.findBySlug(slug);

    if (existingCourse) {
      throw new Error('Course already exists');
    }

    return this.prisma.course.create({
      data: {
        title,
        slug: slug,
      },
    });
  }
}
