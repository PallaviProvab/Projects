import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('create')
  create(@Body() dto: CreateStudentDto) {
    return this.studentService.createStudent(dto);
  }

  @Get('view')
  findAll() {
    return this.studentService.findAll();
  }

  @Get('ciew/:id')
  findOne(@Param('id') id: number) {
    return this.studentService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.studentService.update(+id, body);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.studentService.remove(+id);
  }
}
