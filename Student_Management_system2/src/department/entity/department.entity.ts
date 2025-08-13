import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Course } from 'src/course/entity/course.entity';

@ObjectType()
@Entity()
export class Department {
  @PrimaryGeneratedColumn()
    @Field()
  id: number;

  @Column()
    @Field()
  name: string;

  @ManyToOne(() => Course, (course) => course.departments, { onDelete: 'CASCADE' })
   @Field(() => Course)
  course: Course;
}
