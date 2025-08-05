import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './entity/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  //Get all students
  @Query(() => [Student])
  getAllStudents(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  //Get one student by ID
  @Query(() => Student)
  getStudentById(@Args('id', { type: () => Int }) id: number): Promise<Student> {
    return this.studentService.findOne(id);
  }

  //Create new student
  @Mutation(() => Student)
  createStudent(@Args('input') input: CreateStudentDto): Promise<Student> {
    return this.studentService.createStudent(input);
  }

  //Update student
  @Mutation(() => Student)
  updateStudent(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateStudentDto,
  ): Promise<Student> {
    return this.studentService.update(id, input);
  }

  //Delete student
  @Mutation(() => String)
  async deleteStudent(@Args('id', { type: () => Int }) id: number): Promise<string> {
    const result = await this.studentService.remove(id);
    return result.message;
  }
}
