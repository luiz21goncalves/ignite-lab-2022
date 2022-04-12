import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { CoursesService } from '../../services/course.service';
import { EnrollmentsService } from '../../services/enrollment.service';
import { StudentsService } from '../../services/student.service';

type PurchaseCreatedPayload = {
  customer: {
    auth_user_id: string;
  };
  product: {
    title: string;
    slug: string;
  };
};

@Controller()
export class PurchasesController {
  constructor(
    private coursesService: CoursesService,
    private enrollmentsService: EnrollmentsService,
    private studentsService: StudentsService,
  ) {}

  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload('value') payload: PurchaseCreatedPayload) {
    let student = await this.studentsService.getStudentByAuthUserId(
      payload.customer.auth_user_id,
    );

    if (!student) {
      student = await this.studentsService.createStudent({
        auth_user_id: payload.customer.auth_user_id,
      });
    }

    let course = await this.coursesService.getCourseBySlug(
      payload.product.slug,
    );

    if (!course) {
      course = await this.coursesService.createCourse({
        title: payload.product.title,
        slug: payload.product.slug,
      });
    }

    await this.enrollmentsService.createEnrollment({
      course_id: course.id,
      student_id: student.id,
    });
  }
}
