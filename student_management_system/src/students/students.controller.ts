import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';

import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

import { SubjectsService } from '../subject/subject.service';




import { MarksService } from '../marks/marks.service';

import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly subjectsService: SubjectsService,
    private readonly marksService: MarksService
  ) {}

  @Get('allstudents')
  findAll() {
    return this.studentsService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.findOne(id);
  }

  @Post('create')
  create(@Body() dto: CreateStudentDto) {
    return this.studentsService.create(dto);
  }

  @Put('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStudentDto) {
    return this.studentsService.update(id, dto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.remove(id);
  }

  @Get(':id/details')
  async getDetails(@Param('id', ParseIntPipe) id: number) {
    try {
      const student = await this.studentsService.findOne(id);
      if (!student) {
        return { message: 'Student not found' };
      }

      // Get subjects for student's stream
      const subjects = await this.subjectsService.getSubjectsByStream(student.stream);

      // If you're storing subjectIds in student DTO, this will break now.
      // So for now, just send all subjects of that stream.
      // Later, if you add a join table between students and subjects, you can filter.
      
      const marks = await this.marksService.getMarksByStudent(id);

      return {
        personal: student,
        subjects: subjects || [],
        marks: marks || [],
      };
    } catch (err) {
      console.error('Error in getDetails:', err);
      throw err;
    }
  }
}
