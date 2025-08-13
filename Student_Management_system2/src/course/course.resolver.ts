import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { Course } from './entity/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Mutation(() => Course)
  createCourse(@Args('createCourseDto') createCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseService.create(createCourseDto);
  }

  @Query(() => [Course])
  findAllCourses(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Query(() => Course)
  findCourse(@Args('id', { type: () => Int }) id: number): Promise<Course> {
    return this.courseService.findOne(id);
  }

  @Mutation(() => Course)
  updateCourse(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateCourseDto') updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    return this.courseService.update(id, updateCourseDto);
  }

  @Mutation(() => Boolean)
  async removeCourse(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    await this.courseService.remove(id);
    return true;
  }
}
