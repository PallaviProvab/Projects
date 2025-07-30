import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CollegeModule } from './college/college.module';
import { CourseModule } from './course/course.module';
import { DepartmentModule } from './department/department.module';
import { StudentModule } from './student/student.module';
import { MailModule } from './mail/mail.module';





import { ConfigModule } from '@nestjs/config';




@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username:'root',
      password:'Pallavi@123', 
      database:'student_management_system2',
      autoLoadEntities: true,
      synchronize: true,
    }), CollegeModule , CourseModule, DepartmentModule, StudentModule, MailModule
  ],
  controllers: [AppController],
  providers: [
    AppService],
})
export class AppModule {}
