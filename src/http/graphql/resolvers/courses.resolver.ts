import { Resolver } from '@nestjs/graphql';
import { Course } from '../schemas/course';

@Resolver(() => Course)
export class CoursesResolver {}
