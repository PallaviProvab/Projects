import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { CreateMarkDto } from './dto/create-marks.dto';

@Injectable()
export class MarksService {
  private marksFilePath = path.join(__dirname, '../../data/marks.json');
  private subjectsFilePath = path.join(__dirname, '../../data/subjects.json');

  // 🧾 Read marks.json
  private async readMarks() {
    const content = await fs.readFile(this.marksFilePath, 'utf-8');
    return JSON.parse(content);
  }

  // ✍️ Write to marks.json
  private async writeMarks(data: any) {
    await fs.writeFile(this.marksFilePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  // 📚 Read subjects.json
  private async readSubjects() {
    const content = await fs.readFile(this.subjectsFilePath, 'utf-8');
    return JSON.parse(content);
  }

  // ➕ Add mark (only if subject exists and no duplicate)
  async addMark(dto: CreateMarkDto) {
    const marks = await this.readMarks();
    const subjects = await this.readSubjects();

    const subjectExists =
      (subjects.arts || []).some((s: any) => s.id === dto.subjectId) ||
      (subjects.science || []).some((s: any) => s.id === dto.subjectId);

    if (!subjectExists) {
      return { message: 'Subject ID does not exist in subject table' };
    }

    const duplicate = marks.find(
      (m: any) =>
        m.studentId === dto.studentId && m.subjectId === dto.subjectId,
    );

    if (duplicate) {
      return { message: 'Mark for this subject already exists for the student' };
    }

    marks.push(dto);
    await this.writeMarks(marks);
    return dto;
  }

  // 📊 Get all marks for a student
  async getMarksByStudent(studentId: number) {
    const marks = await this.readMarks();
    return marks.filter((m: any) => m.studentId === studentId);
  }

  // 📋 Get all marks (all students)
  async getAllMarks() {
    return this.readMarks();
  }

  // 🔄 Update existing mark
  async updateMark(studentId: number, subjectId: number, newMarks: number) {
    const marks = await this.readMarks();
    const index = marks.findIndex(
      (m: any) => m.studentId === studentId && m.subjectId === subjectId,
    );

    if (index === -1) {
      return { message: 'Mark not found for this student and subject' };
    }

    marks[index].marks = newMarks;
    await this.writeMarks(marks);
    return marks[index];
  }

  async deleteMark(studentId: number, subjectId: number) {
  const marks = await this.readMarks();
  const updatedMarks = marks.filter(
    (mark) => !(mark.studentId === studentId && mark.subjectId === subjectId)
  );

  await this.writeMarks(updatedMarks);
  return { message: 'Mark deleted successfully' };
}
}
