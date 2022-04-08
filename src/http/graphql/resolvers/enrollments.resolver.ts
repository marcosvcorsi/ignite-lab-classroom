import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CoursesService } from '../../../services/courses.service';
import { EnrollmentsService } from '../../../services/enrollments.service';
import { StudentsService } from '../../../services/students.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Enrollment } from '../schemas/enrollment';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private readonly enrollmentsService: EnrollmentsService,
    private readonly coursesService: CoursesService,
    private readonly studentsService: StudentsService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => [Enrollment])
  async enrollments() {
    return this.enrollmentsService.findAll();
  }

  @ResolveField()
  async student(@Parent() enrollment: Enrollment) {
    return this.studentsService.findById(enrollment.studentId);
  }

  @ResolveField()
  async course(@Parent() enrollment: Enrollment) {
    return this.coursesService.findById(enrollment.courseId);
  }
}
