import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
} from 'typeorm';
import { College } from 'src/college/entity/college.entity';
import { Course } from 'src/course/entity/course.entity';
import { Department } from 'src/department/entity/department.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  @Field(() => ID) // ✅ Add this
  id: number;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @ManyToOne(() => College, { eager: true })
  @Field(() => College) 
  college: College;

  @ManyToOne(() => Course, { eager: true })
  @Field(() => Course) 
  course: Course;

  @ManyToOne(() => Department, { eager: true })
  @Field(() => Department) 
  department: Department;

  @Column()
  @Field()
  creditLimit: number;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  userId: string;

  @Column()
  password: string; 

  @Column({ default: 'student' })
  @Field()
  role: string;
}
