import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { Department } from './entity/department.entity';
import { Course } from 'src/course/entity/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentResolver } from './department.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Course])],
  controllers: [DepartmentController],
  providers: [DepartmentService, DepartmentResolver]
})
export class DepartmentModule {}
