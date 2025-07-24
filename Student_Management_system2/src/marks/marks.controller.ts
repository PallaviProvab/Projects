import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { MarksService } from './marks.service';
import { CreateMarkDto } from './dto/create-marks.dto';
import { UpdateMarkDto } from './dto/update-marks.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@UseGuards(AuthGuard('jwt'))

@Controller('marks')
export class MarksController {
  constructor(private readonly marksService: MarksService) {}

  @Post('create')
  addMark(@Body() dto: CreateMarkDto) {
    return this.marksService.addMark(dto);
  }

  @Put('update/:studentId/:subjectId')
updateMark(
  @Param('studentId', ParseIntPipe) studentId: number,
  @Param('subjectId', ParseIntPipe) subjectId: number,
  @Body() dto: UpdateMarkDto,
) {
  return this.marksService.updateMark(studentId, subjectId, dto.marks);
}

 

  @Get('student/:id')
  getMarksForStudent(@Param('id', ParseIntPipe) id: number) {
    return this.marksService.getMarksByStudent(id);
  }

  
  @Get('all')
  getAll() {
    return this.marksService.getAllMarks();
  }

   @Delete('delete/:studentId/:subjectId')
  deleteSubjectMarks(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Param('subjectId', ParseIntPipe) subjectId: number,
  ) {
    return this.marksService.deleteMark(studentId, subjectId);
  }
}

