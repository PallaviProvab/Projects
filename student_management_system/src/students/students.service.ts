import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Stream } from './stream.enum'; 

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async findAll() {
    return this.studentRepo.find({ relations: ['marks'] });
  }

  async findOne(id: number) {
    const student = await this.studentRepo.findOne({
      where: { id },
      relations: ['marks'],
    });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async create(dto: CreateStudentDto) {
    const student = this.studentRepo.create({
      ...dto,
      stream: dto.stream as Stream, 
    });
    return this.studentRepo.save(student);
  }

  async update(id: number, dto: UpdateStudentDto) {
    const student = await this.findOne(id);
    if (!student) throw new NotFoundException('Student not found');
    await this.studentRepo.update(id, {
      ...dto,
      stream: dto.stream as Stream, 
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    const student = await this.findOne(id);
    if (!student) throw new NotFoundException('Student not found');
    await this.studentRepo.delete(id);
    return { message: 'Deleted successfully' };
  }
}
