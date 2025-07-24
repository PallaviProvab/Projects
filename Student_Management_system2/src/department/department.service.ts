import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entity/department.entity';
import { Course } from 'src/course/entity/course.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';


@Injectable()
export class DepartmentService {
   constructor(
    @InjectRepository(Department)
    private deptRepo: Repository<Department>,
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
  ) {}

  async create(dto: CreateDepartmentDto): Promise<Department> {
    const course = await this.courseRepo.findOne({ where: { id: dto.courseId } });
    if (!course) throw new NotFoundException('Course not found');

    const dept = this.deptRepo.create({ name: dto.name, course });
    return this.deptRepo.save(dept);
  }

  findAll(): Promise<Department[]> {
    return this.deptRepo.find({ relations: ['course'] });
  }

  findOne(id: number): Promise<Department | null> {
    return this.deptRepo.findOne({ where: { id }, relations: ['course'] });
  }

 async update(id: number, dto: UpdateDepartmentDto) {
  const department = await this.deptRepo.findOne({ where: { id }, relations: ['course'] });

  if (!department) {
    throw new NotFoundException('Department not found');
  }

  if (dto.name) {
    department.name = dto.name;
  }

  if (dto.courseId) {
    const course = await this.courseRepo.findOne({ where: { id: dto.courseId } });
    if (!course) throw new NotFoundException('Course not found');
    department.course = course;
  }

  return this.deptRepo.save(department);
}

  async remove(id: number) {
    const res = await this.deptRepo.delete(id);
    if (res.affected === 0) throw new NotFoundException('Department not found');
    return { message: 'Department deleted successfully' };
  }
}
