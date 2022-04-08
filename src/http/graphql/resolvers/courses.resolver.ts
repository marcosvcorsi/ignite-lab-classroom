import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoursesService } from '../../../services/courses.service';
import { EnrollmentsService } from '../../../services/enrollments.service';
import { StudentsService } from '../../../services/students.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { Course, CreateCourseInput } from '../schemas/course';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly enrollmentService: EnrollmentsService,
    private readonly studentsService: StudentsService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => Course)
  async course(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentsService.findByAuthUserId(user.sub);

    if (!student) {
      throw new Error('Invalid auth');
    }

    const enrollment = await this.enrollmentService.findByCourseIdAndStudentId(
      id,
      student.id,
    );

    if (!enrollment) {
      throw new Error('Course not found');
    }

    return this.coursesService.findById(id);
  }

  @UseGuards(AuthorizationGuard)
  @Query(() => [Course])
  async courses() {
    return this.coursesService.findAll();
  }

  @Mutation(() => Course)
  async createCourse(@Args('input') input: CreateCourseInput) {
    return this.coursesService.create(input);
  }
}
