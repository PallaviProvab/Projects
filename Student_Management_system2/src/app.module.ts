import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollegeModule } from './college/college.module';
import { CourseModule } from './course/course.module';
import { DepartmentModule } from './department/department.module';
import { StudentModule } from './student/student.module';
=======
import { StudentsModule } from './students/students.module';
import { SubjectsModule } from './subject/subject.module';
import { MarksModule } from './marks/marks.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Student } from './students/student.entity';
import { Subject } from './subject/subject.entity';
import { Mark } from './marks/marks.entity';
>>>>>>> ed7c87eef88ec0ab57fcce1ae5f83a036a0c1aa3


@Module({
  imports: [
    TypeOrmModule.forRoot({
<<<<<<< HEAD
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username:'root',
      password:'Pallavi@123', 
      database:'student_management_system2',
      autoLoadEntities: true,
      synchronize: true,
    }), CollegeModule , CourseModule, DepartmentModule, StudentModule
  ],
=======
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'Pallavi@123',
      database:'student_management_system',
      entities: [Student, Subject, Mark],
      autoLoadEntities: true,
      synchronize: true,
    }),
    StudentsModule, SubjectsModule, MarksModule, AuthModule, ],
>>>>>>> ed7c87eef88ec0ab57fcce1ae5f83a036a0c1aa3
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
