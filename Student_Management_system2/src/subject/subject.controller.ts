import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { SubjectsService } from './subject.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get('all')
  getAllSubjects(@Query('sortBy') sortBy: 'id' | 'name' = 'id') {
    return this.subjectsService.getAllSubjects(sortBy);
  }

  @Get('streamname/:stream')
  getSubjects(@Param('stream') stream: 'arts' | 'science') {
    return this.subjectsService.getSubjectsByStream(stream);
  }

  @Post('create')
  createSubject(@Body() dto: CreateSubjectDto) {
    return this.subjectsService.addSubject(dto);
  }

 @Put('update/:stream/:id')
updateSubject(
  @Param('stream') stream: 'arts' | 'science',
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: UpdateSubjectDto,
) {
  if (!dto.name) {
    throw new BadRequestException('Subject name is required');
  }

  // Inject stream into DTO before passing to service
  return this.subjectsService.updateSubject(id, { ...dto, stream });
}

  @Delete('delete/:stream/:id')
  deleteSubject(
    @Param('stream') stream: 'arts' | 'science',
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.subjectsService.deleteSubject(stream, id);
  }
}
