import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { CreateNoteDto } from './create-note.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notes: NotesService) {}

  @Get()
  list() {
    return this.notes.list();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.notes.get(id);
  }

  @Post()
  create(@Body() input: CreateNoteDto) {
    return this.notes.create(input);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.notes.remove(id);
  }
}
