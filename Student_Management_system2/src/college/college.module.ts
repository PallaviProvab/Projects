import { Module } from '@nestjs/common';
import { CollegeController } from './college.controller';
import { CollegeService } from './college.service';
import { College } from './entity/college.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([College])],
  controllers: [CollegeController],
  providers: [CollegeService],
  exports :[TypeOrmModule]
})
export class CollegeModule {}
