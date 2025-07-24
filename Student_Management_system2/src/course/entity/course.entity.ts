import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { College } from 'src/college/entity/college.entity';
import { Department } from 'src/department/entity/department.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => College, (college) => college.courses, { onDelete: 'CASCADE' })
  college: College;

  @OneToMany(() => Department, (department) => department.course)
  departments: Department[];
}