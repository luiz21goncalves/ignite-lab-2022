import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

type CreateStudentParams = {
  auth_user_id: string;
};

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  listAllStudents() {
    return this.prisma.student.findMany();
  }

  getStudentByAuthUserId(auth_user_id: string) {
    return this.prisma.student.findUnique({
      where: {
        auth_user_id,
      },
    });
  }

  getStudentById(id: string) {
    return this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }

  createStudent({ auth_user_id }: CreateStudentParams) {
    return this.prisma.student.create({
      data: {
        auth_user_id,
      },
    });
  }
}
