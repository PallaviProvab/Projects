import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entity/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { College } from 'src/college/entity/college.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
    @InjectRepository(College)
    private collegeRepo: Repository<College>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const college = await this.collegeRepo.findOneBy({ id: createCourseDto.collegeId });
    if (!college) {
      throw new NotFoundException('College not found');
    }

    const course = this.courseRepo.create({
      name: createCourseDto.name,
      college: college,
    });

    return this.courseRepo.save(course);
  }

  findAll(): Promise<Course[]> {
    return this.courseRepo.find({ relations: ['college'] });
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.courseRepo.findOne({
      where: { id },
      relations: ['college'],
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  async update(id: number, updateDto: UpdateCourseDto): Promise<Course> {
    const course = await this.findOne(id);

    if (updateDto.name) course.name = updateDto.name;

    if (updateDto.collegeId) {
      const college = await this.collegeRepo.findOneBy({ id: updateDto.collegeId });
      if (!college) throw new NotFoundException('College not found');
      course.college = college;
    }

    return this.courseRepo.save(course);
  }

 async remove(id: number): Promise<void> {
  const course = await this.courseRepo.findOneBy({ id });

  if (!course) {
    throw new NotFoundException(`Course with ID ${id} not found`);
  }

  await this.courseRepo.remove(course);
}
}
