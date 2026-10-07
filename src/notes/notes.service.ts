import { Injectable, NotFoundException } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import type { CreateNoteDto } from './create-note.dto';

export interface Note {
  id: number;
  title: string;
  body: string;
  createdAt: string;
}

const COLUMNS = 'id, title, body, created_at AS "createdAt"';

@Injectable()
export class NotesService {
  constructor(private readonly db: DatabaseService) {}

  async list(): Promise<Note[]> {
    const { rows } = await this.db.query<Note>(
      `SELECT ${COLUMNS} FROM notes ORDER BY id DESC LIMIT 100`,
    );
    return rows;
  }

  async get(id: number): Promise<Note> {
    const { rows } = await this.db.query<Note>(`SELECT ${COLUMNS} FROM notes WHERE id = $1`, [id]);
    if (!rows[0]) throw new NotFoundException(`Note ${id} not found`);
    return rows[0];
  }

  async create(input: CreateNoteDto): Promise<Note> {
    const { rows } = await this.db.query<Note>(
      `INSERT INTO notes (title, body) VALUES ($1, $2) RETURNING ${COLUMNS}`,
      [input.title, input.body ?? ''],
    );
    return rows[0];
  }

  async remove(id: number): Promise<void> {
    const { rowCount } = await this.db.query('DELETE FROM notes WHERE id = $1', [id]);
    if (!rowCount) throw new NotFoundException(`Note ${id} not found`);
  }
}
