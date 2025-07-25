import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/department/entity/department.entity';
import { Student } from './entity/student.entity';
import { Course } from 'src/course/entity/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student,Department, Course])],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
