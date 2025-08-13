import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Mark } from '../marks/marks.entity';
import {Stream} from './stream.enum'

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  stream: Stream;

  @OneToMany(() => Mark, (mark) => mark.subject)
  marks: Mark[];
}