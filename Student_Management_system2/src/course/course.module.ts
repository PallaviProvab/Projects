import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entity/course.entity';
import { College } from 'src/college/entity/college.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, College])],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}


