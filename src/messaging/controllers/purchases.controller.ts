import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CoursesService } from '../../services/courses.service';
import { EnrollmentsService } from '../../services/enrollments.service';
import { StudentsService } from '../../services/students.service';

type PurchaseCreatedPayload = {
  customer: {
    authUserId: string;
  };
  product: {
    id: string;
    title: string;
    slug: string;
  };
};

@Controller()
export class PurchasesController {
  private logger: Logger;

  constructor(
    private readonly studentsService: StudentsService,
    private readonly coursesService: CoursesService,
    private readonly enrollmentsService: EnrollmentsService,
  ) {
    this.logger = new Logger(PurchasesController.name);
  }

  @EventPattern('purchases.purchase-created')
  async purchaseCreated(@Payload('value') payload: PurchaseCreatedPayload) {
    this.logger.log(
      `Received purchase-created event: ${JSON.stringify(payload)}`,
    );

    const { customer, product } = payload;

    let student = await this.studentsService.findByAuthUserId(
      customer.authUserId,
    );

    if (!student) {
      student = await this.studentsService.create({
        authUserId: customer.authUserId,
      });
    }

    let course = await this.coursesService.findBySlug(product.slug);

    if (!course) {
      course = await this.coursesService.create({
        title: product.title,
        slug: product.slug,
      });
    }

    await this.enrollmentsService.create({
      courseId: course.id,
      studentId: student.id,
    });

    this.logger.log(
      `Enrolled created student ${student.id} in course ${course.id}`,
    );
  }
}
