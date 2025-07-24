import { Controller, Post, Body, Get,Patch,  Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';



@Controller('department')
export class DepartmentController {

  constructor(private readonly deptService: DepartmentService) {}

  @Post('create')
  create(@Body() dto: CreateDepartmentDto) {
    return this.deptService.create(dto);
  }

  @Get('view')
  findAll() {
    return this.deptService.findAll();
  }

  @Get('view/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.deptService.findOne(id);
  }

  @Patch('update/:id')
  update(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: UpdateDepartmentDto,
  ) {
  return this.deptService.update(id, dto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deptService.remove(id);
  }
}
