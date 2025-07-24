import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { MarksModule } from '../marks/marks.module';
import { Student } from './student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsModule } from '../subject/subject.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),  
    MarksModule,
    SubjectsModule, // 👈 This now provides access to SubjectRepository and SubjectsService
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}

