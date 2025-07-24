import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

import { Student } from './student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubjectsModule } from '../subject/subject.module';
import { MarksModule } from '../marks/marks.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),  
    MarksModule,
    SubjectsModule, 
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}

