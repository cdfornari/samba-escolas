import { Injectable } from '@nestjs/common';
import { CreateSambaInput } from './dto/create-samba.input';
import { UpdateSambaInput } from './dto/update-samba.input';
import { QueryService } from 'src/common/services/query.service';
import { CRUDService } from 'src/common/services/crud.service';
import { Samba } from './entities/samba.entity';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { HistoricoIntegrante } from 'src/escolas/integrante-history/entities/integrante-history.entity';

@Injectable()
export class SambasService {
  constructor(
    private readonly queryService: QueryService,
    private readonly crudService: CRUDService,
  ) {}

  private tableName = 'sambas';

  create(createSambaInput: CreateSambaInput) {
    return this.crudService.create(this.tableName, createSambaInput);
  }

  async findAll(pagination: PaginationArgs): Promise<Samba[]> {
    return this.crudService.findAll(this.tableName, pagination);
  }

  async count(): Promise<number> {
    return this.queryService.count(this.tableName);
  }

  findOne(id: number) {
    return this.crudService.findOne(this.tableName, id);
  }

  update(input: UpdateSambaInput) {
    const { id, ...dto } = input;
    return this.crudService.updateOne(this.tableName, id, dto);
  }

  remove(id: number) {
   
  }

  async getAutores(id: number) {
    return this.queryService.executeRawQuery<HistoricoIntegrante[]>(
      `SELECT * FROM csd_autores
      JOIN csd_historicos_integrantes ON csd_autores.id_integrante = csd_historicos_integrantes.id_escuela AND csd_autores.id_escuela = csd_historicos_integrantes.id_escuela AND csd_autores.fecha_inicio = csd_historicos_integrantes.fecha_inicio
      WHERE id_samba = ${id}
      `,
    );
  }

  async addAutor(id: number, id_integrante: number, fecha_inicio: Date, id_escuela: number) {
    return this.crudService.create('autores', {
      id_integrante,
      fecha_inicio,
      id_escuela,
      id_samba: id,
    });
  }

  async removeAutor(id: number, id_integrante: number, fecha_inicio: Date, id_escuela: number) {
    return this.crudService.delete('autores', {
      id_integrante,
      fecha_inicio,
      id_escuela,
      id_samba: id,
      type: 'AND',
    });
  }
}
