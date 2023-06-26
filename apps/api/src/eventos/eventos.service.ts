import { Injectable } from '@nestjs/common';
import { CreateEventoInput } from './dto/create-evento.input';
import { UpdateEventoInput } from './dto/update-evento.input';
import { QueryService } from 'src/common/services/query.service';
import { CRUDService } from 'src/common/services/crud.service';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { Evento } from './entities/evento.entity';
import { EventosFilterArgs } from './types/eventos-filter.args';

@Injectable()
export class EventosService {
  constructor(
    private readonly queryService: QueryService,
    private readonly crudService: CRUDService,
  ) {}

  private tableName = 'eventos_anuales_sems';

  create(createEventoInput: CreateEventoInput) {
    return this.crudService.create(this.tableName, createEventoInput);
  }

  async findAll(
    pagination: PaginationArgs,
    filter: EventosFilterArgs,
  ): Promise<Evento[]> {
    return this.crudService.findAll(this.tableName, pagination, filter);
  }

  findOne(id: number) {
    return this.crudService.findOne(this.tableName, id);
  }

  update(updateEventoInput: UpdateEventoInput) {
    const { id, ...dto } = updateEventoInput;
    return this.crudService.updateOne(this.tableName, id, dto);
  }

  async count(filter: EventosFilterArgs): Promise<number> {
    return this.queryService.count(
      this.tableName,
      `id_escuela = ${filter.id_escuela}`,
    );
  }

  remove(id: number) {
    return this.crudService.delete(this.tableName, { id });
  }
}
