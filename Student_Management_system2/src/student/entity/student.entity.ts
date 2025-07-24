import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
} from 'typeorm';
import { College } from 'src/college/entity/college.entity';
import { Course } from 'src/course/entity/course.entity';
import { Department } from 'src/department/entity/department.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @ManyToOne(() => College, { eager: true })
  college: College;

  @ManyToOne(() => Course, { eager: true })
  course: Course;

  @ManyToOne(() => Department, { eager: true })
  Department: Department;

  @Column()
  creditLimit: number;

  @Column({ unique: true })
  email: string;

  @Column()
  userId: string;

  @Column()
  password: string;

  @Column({ default: 'student' }) 
  role: string;
}