import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { SubjectsService } from './subject.service';
import { SubjectsController } from './subject.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  providers: [SubjectsService],
  controllers: [SubjectsController],
  exports: [SubjectsService, TypeOrmModule], // 👈 EXPORT!
})
export class SubjectsModule {}
