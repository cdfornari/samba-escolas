import { Injectable } from '@nestjs/common';
import { CreateSambaInput } from './dto/create-samba.input';
import { UpdateSambaInput } from './dto/update-samba.input';
import { QueryService } from 'src/common/services/query.service';
import { CRUDService } from 'src/common/services/crud.service';
import { Samba } from './entities/samba.entity';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { SambasFilterArgs } from './types/sambas-filter.args';
import { SambasFilterIdsArgs } from './types/sambas-filter-id.args';

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

  async update(input: UpdateSambaInput) {
    const { id, id_integrantes = [], ...dto } = input;
    if (id_integrantes.length > 0) {
      this.queryService.executeRawQuery(
        `DELETE FROM csd_autores WHERE id_samba = ${id}`,
      );

      await Promise.all(
        id_integrantes.map((autor) =>
          this.addAutor({
            id_integrante: autor.id_integrante, 
            fecha_inicio: autor.fecha_inicio, 
            id_escuela: autor.id_escuela, 
            id_samba: id
          }),
        ),
      );
    }
    return this.crudService.updateOne(this.tableName, id, dto);
  }

  async remove(id: number) {
    await this.crudService.delete('autores', { id_samba: id });
    return this.crudService.delete(this.tableName, { id });
  }

  async getSambas(pagination: PaginationArgs, idEscola: number) {
    return this.queryService.executeRawQuery<Samba[]>(
      `SELECT * FROM csd_sambas
        JOIN csd_autores ON csd_autores.id_samba = csd_sambas.id
        WHERE id_escuela = ${idEscola}
        ${
          pagination
            ? `LIMIT ${pagination.perPage} OFFSET ${
                (pagination.page - 1) * pagination.perPage
              }`
            : ''
        }
        `,
    );
  }

  async removeAutor(id: number) {
    await this.crudService.delete('autores', { id_samba: id });
  }

  async addAutor({id_integrante,fecha_inicio,id_escuela,id_samba}: SambasFilterArgs) {
    return this.crudService.create('autores', {
      id_integrante,
      fecha_inicio,
      id_escuela,
      id_samba
    });
  }

}
