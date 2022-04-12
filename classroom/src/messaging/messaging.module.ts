import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { CoursesService } from '../services/course.service';
import { EnrollmentsService } from '../services/enrollment.service';
import { StudentsService } from '../services/student.service';
import { PurchasesController } from './controllers/purchases.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PurchasesController],
  providers: [CoursesService, EnrollmentsService, StudentsService],
})
export class MessagingModule {}
