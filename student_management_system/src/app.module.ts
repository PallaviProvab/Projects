import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { SubjectsModule } from './subject/subject.module';
import { MarksModule } from './marks/marks.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Student } from './students/student.entity';
import { Subject } from './subject/subject.entity';
import { Mark } from './marks/marks.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
