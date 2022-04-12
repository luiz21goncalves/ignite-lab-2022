import { ApolloFederationDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';

import { DatabaseModule } from '../database/database.module';
import { CoursesService } from '../services/course.service';
import { EnrollmentsService } from '../services/enrollment.service';
import { StudentsService } from '../services/student.service';
import { CoursesResolver } from './graphql/resolvers/course.resolver';
import { EnrollmentsResolver } from './graphql/resolvers/enrollment.resolver';
import { StudentsResolver } from './graphql/resolvers/students.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
    DatabaseModule,
  ],
  providers: [
    CoursesResolver,
    EnrollmentsResolver,
    StudentsResolver,
    CoursesService,
    EnrollmentsService,
    StudentsService,
  ],
})
export class HttpModule {}
