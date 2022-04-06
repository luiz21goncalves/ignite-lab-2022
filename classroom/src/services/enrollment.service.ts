import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

type GetByCourseIdAndStudentIdParams = {
  course_id: string;
  student_id: string;
};

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: {
        canceled_at: null,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  listEnrollmentByStudentId(student_id: string) {
    return this.prisma.enrollment.findMany({
      where: {
        student_id,
        canceled_at: null,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  getByCourseIdAndStudentId({
    course_id,
    student_id,
  }: GetByCourseIdAndStudentIdParams) {
    return this.prisma.enrollment.findFirst({
      where: {
        student_id,
        course_id,
        canceled_at: null,
      },
    });
  }
}
