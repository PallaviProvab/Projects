import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CollegeService } from './college.service';
import { College } from './entity/college.entity';
import { CreateCollegeDto } from './dto/create-college.dto';
import { UpdateCollegeDto } from './dto/update-college.dto';

@Resolver(() => College)
export class CollegeResolver {
  constructor(private readonly collegeService: CollegeService) {}

  @Query(() => [College])
  getAllColleges(): Promise<College[]> {
    return this.collegeService.findAll();
  }

  @Query(() => College)
  getCollegeById(@Args('id', { type: () => Int }) id: number): Promise<College> {
    return this.collegeService.findOne(id);
  }

  @Mutation(() => College)
  createCollege(@Args('input') input: CreateCollegeDto): Promise<College> {
    return this.collegeService.create(input);
  }

  @Mutation(() => String)
  updateCollege(@Args('input') input: UpdateCollegeDto): Promise<string> {
    return this.collegeService.update(input.id, input);
  }

  @Mutation(() => String)
  deleteCollege(@Args('id', { type: () => Int }) id: number): Promise<string> {
    return this.collegeService.remove(id);
  }
}
