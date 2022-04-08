import { Resolver } from '@nestjs/graphql';
import { Enrollment } from '../schemas/enrollment';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {}
