import { Controller, Post, Get, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CollegeService } from './college.service';
import { CreateCollegeDto } from './dto/create-college.dto';
import { UpdateCollegeDto } from './dto/update-college.dto';

@Controller('colleges')
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) {}

  @Post('create')
  create(@Body() dto: CreateCollegeDto) {
    return this.collegeService.create(dto);
  }

  @Get('view')
  findAll() {
    return this.collegeService.findAll();
  }

  @Get('view/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.collegeService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCollegeDto) {
    return this.collegeService.update(id, dto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.collegeService.remove(id);
  }
}
