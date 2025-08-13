import { Controller, Post, Get, Patch, Delete, ParseIntPipe, Param, Body} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
 constructor(private readonly courseService: CourseService) {}

 @Post('create')
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get('view')
  findAll() {
    return this.courseService.findAll();
  }

  @Get('view/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.findOne(id);
  }

  @Patch('update/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCourseDto,
  ) {
    return this.courseService.update(id, updateDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
  await this.courseService.remove(id);
  return { message: `Course with ID ${id} successfully deleted.` };
  }

}
