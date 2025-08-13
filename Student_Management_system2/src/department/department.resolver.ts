// department.resolver.ts
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { Department } from './entity/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Mutation(() => Department)
  createDepartment(@Args('input') input: CreateDepartmentDto) {
    return this.departmentService.create(input);
  }

  @Query(() => [Department])
  findAllDepartments() {
    return this.departmentService.findAll();
  }

  @Query(() => Department)
  findDepartment(@Args('id', { type: () => Int }) id: number) {
    return this.departmentService.findOne(id);
  }

  @Mutation(() => Department)
  updateDepartment(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateDepartmentDto,
  ) {
    return this.departmentService.update(id, input);
  }

  @Mutation(() => String)
  deleteDepartment(@Args('id', { type: () => Int }) id: number) {
    return this.departmentService.remove(id).then((res) => res.message);
  }
}
