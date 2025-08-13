import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { College } from './entity/college.entity';
import { CreateCollegeDto } from './dto/create-college.dto';
import { UpdateCollegeDto } from './dto/update-college.dto';

@Injectable()
export class CollegeService {
  constructor(
    @InjectRepository(College)
    private readonly collegeRepo: Repository<College>,
  ) {}

  async create(dto: CreateCollegeDto) {
    const college = this.collegeRepo.create(dto);
    return this.collegeRepo.save(college);
  }

  async findAll() {
    return this.collegeRepo.find();
  }

  async findOne(id: number) {
    const college = await this.collegeRepo.findOneBy({ id });
    if (!college) throw new NotFoundException(`College with ID ${id} not found`);
    return college;
  }

  async update(id: number, dto: UpdateCollegeDto) {
    const result = await this.collegeRepo.update(id, dto);
    if (result.affected === 0) throw new NotFoundException(`College with ID ${id} not found`);
    return `College with ID ${id} updated successfully`;
  }

  async remove(id: number) {
    const result = await this.collegeRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`College with ID ${id} not found`);
    return `College with ID ${id} deleted successfully`;
  }
}

