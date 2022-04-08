import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoursesService } from '../../../services/courses.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Course, CreateCourseInput } from '../schemas/course';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}

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
