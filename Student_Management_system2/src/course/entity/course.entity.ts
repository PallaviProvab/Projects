import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { College } from 'src/college/entity/college.entity';
import { Department } from 'src/department/entity/department.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToOne(() => College, (college) => college.courses, { onDelete: 'CASCADE' })
   @Field(() => College)
  college: College;

  @OneToMany(() => Department, (department) => department.course)
  @Field(() => [Department], { nullable: true })
  departments: Department[];
}