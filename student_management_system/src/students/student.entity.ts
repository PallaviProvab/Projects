import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Mark } from '../marks/marks.entity';
import { Stream } from './stream.enum';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  rollNo: string;

  @Column()
  address: string;

  @Column({
    type: 'enum',
    enum: Stream,
  })
  stream: Stream;

  @OneToMany(() => Mark, (mark) => mark.student)
  marks: Mark[];
}
