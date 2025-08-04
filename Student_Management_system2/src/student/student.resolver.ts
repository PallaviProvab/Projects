import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './entity/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => Student)
  createStudent(@Args('input') input: CreateStudentDto): Promise<Student> {
    return this.studentService.createStudent(input);
  }

  @Query(() => [Student], { name: 'students' })
  findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Query(() => Student)
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Student> {
    return this.studentService.findOne(id);
  }
}
