import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Course } from 'src/course/entity/course.entity';

@Entity()
export class College {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Course, (course) => course.college)
  courses: Course[];
}