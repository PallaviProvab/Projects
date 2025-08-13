import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../students/student.entity';
import { Subject } from '../subject/subject.entity';

@Entity()
export class Mark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  marks: number;

  @ManyToOne(() => Student, (student) => student.marks, { onDelete: 'CASCADE' })
  student: Student;

  @ManyToOne(() => Subject, (subject) => subject.marks, { onDelete: 'CASCADE' })
  subject: Subject;
}
