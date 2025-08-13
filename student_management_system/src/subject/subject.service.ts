import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Stream } from './stream.enum';

@Injectable()

 export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepo: Repository<Subject>,
  ) {}

  async getAllSubjects(sortBy: 'id' | 'name' = 'id') {
    return this.subjectRepo.find({ order: { [sortBy]: 'ASC' } });
  }

  async getSubjectsByStream(stream: 'arts' | 'science') {
    return this.subjectRepo.find({
      where: { stream: stream as Stream },
      order: { id: 'ASC' },
    });
  }

  async addSubject(dto: CreateSubjectDto) {
    const existing = await this.subjectRepo.findOne({
      where: { name: dto.name, stream: dto.stream as Stream },
    });

    if (existing) {
      return { message: 'Subject already exists in this stream' };
    }

    const newSubject = this.subjectRepo.create({
      name: dto.name,
      stream: dto.stream as Stream,
    });

    return this.subjectRepo.save(newSubject);
  }

async updateSubject(id: number, updateSubjectDto: UpdateSubjectDto) {
  const subject = await this.subjectRepo.findOne({ where: { id } });

  if (!subject) {
    throw new NotFoundException('Subject not found');
  }

  Object.assign(subject, updateSubjectDto);
  return this.subjectRepo.save(subject);
}

  async deleteSubject(stream: 'arts' | 'science', id: number) {
    const subject = await this.subjectRepo.findOne({
      where: { id, stream: stream as Stream },
    });

    if (!subject) throw new NotFoundException('Subject not found');

    await this.subjectRepo.delete(id);
    return { message: 'Deleted successfully' };
  }
}
