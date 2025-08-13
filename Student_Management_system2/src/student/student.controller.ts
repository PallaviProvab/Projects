import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Request,
  NotFoundException,
} from '@nestjs/common';

import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import * as bcrypt from 'bcrypt';


@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('register')
  create(@Body() dto: CreateStudentDto) {
    return this.studentService.createStudent(dto);
  }

  @Get('view')
  findAll() {
    return this.studentService.findAll();
  }

  @Get('view/:id')
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

  @Get('me')
  getMyProfile(@Request() req) {
    return this.studentService.findOne(req.user.userId);
  }

}
