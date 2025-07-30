import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Student } from './entity/student.entity';
import { College } from 'src/college/entity/college.entity';
import { Course } from 'src/course/entity/course.entity';
import { Department } from 'src/department/entity/department.entity';

import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

import { MailService } from 'src/mail/mail.service';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,

    @InjectRepository(College)
    private collegeRepo: Repository<College>,

    @InjectRepository(Course)
    private courseRepo: Repository<Course>,

    @InjectRepository(Department)
    private departmentRepo: Repository<Department>,

    private readonly mailService: MailService,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const { firstName, lastName, email, collegeId, courseId, departmentId, creditLimit } = createStudentDto;

    const college = await this.collegeRepo.findOne({ where: { id: collegeId } });
    if (!college) {
      throw new NotFoundException(`College with ID ${collegeId} not found!`);
    }

    const course = await this.courseRepo.findOne({ where: { id: courseId } });
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found!`);
    }

    const department = await this.departmentRepo.findOne({ where: { id: departmentId } });
    if (!department) {
      throw new NotFoundException(`Department with ID ${departmentId} not found!`);
    }

    const userId = `PRO${Date.now()}`;
    const rawPassword = crypto.randomBytes(4).toString('hex');
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const student = this.studentRepo.create({
      firstName,
      lastName,
      college,
      course,
      department,
      creditLimit,
      email,
      userId,
      password: hashedPassword,
      role: 'student',
    });

    const savedStudent = await this.studentRepo.save(student);

    // Send email
    console.log('Sending mail to:', email);
    await this.mailService.sendStudentCredentials(email, userId, rawPassword);
    console.log('Mail sent!');

    return savedStudent;
  }

  async findAll(): Promise<Student[]> {
    return this.studentRepo.find({
      relations: ['college', 'course', 'department'],
    });
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepo.findOne({
      where: { id },
      relations: ['college', 'course', 'department'],
    });
    if (!student) throw new NotFoundException(`Student with ID ${id} not found!`);
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);
    const { collegeId, courseId, departmentId, ...rest } = updateStudentDto;

    if (collegeId) {
      const college = await this.collegeRepo.findOne({ where: { id: collegeId } });
      if (!college) throw new NotFoundException(`College with ID ${collegeId} not found!`);
      student.college = college;
    }

    if (courseId) {
      const course = await this.courseRepo.findOne({ where: { id: courseId } });
      if (!course) throw new NotFoundException(`Course with ID ${courseId} not found!`);
      student.course = course;
    }

    if (departmentId) {
      const department = await this.departmentRepo.findOne({ where: { id: departmentId } });
      if (!department) throw new NotFoundException(`Department with ID ${departmentId} not found!`);
      student.department = department;
    }

    Object.assign(student, rest);
    return this.studentRepo.save(student);
  }

  async remove(id: number): Promise<{ message: string }> {
    const student = await this.findOne(id);
    await this.studentRepo.remove(student);
    return { message: `Student with ID ${id} deleted successfully.` };
  }
}
