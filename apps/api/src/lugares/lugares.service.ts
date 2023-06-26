import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLugaresInput } from './dto/create-lugares.input';
import { UpdateLugaresInput } from './dto/update-lugares.input';
import { QueryService } from 'src/common/services/query.service';
import { Lugar } from './entities/lugar.entity';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { LugaresFilterArgs } from './types/lugares-filter.args';
import { CRUDService } from 'src/common/services/crud.service';

@Injectable()
export class LugaresService {
  constructor(
    private readonly queryService: QueryService,
    private readonly crudService: CRUDService,
  ) {}

  private tableName = 'lugares_geo';

  async create(input: CreateLugaresInput): Promise<Lugar> {
    const { tipo, id_padre_lugar } = input;
    if (tipo !== 'region' && !id_padre_lugar)
      throw new BadRequestException('id del padre requerido');
    return this.crudService.create(this.tableName, input);
  }

  async findAll(
    pagination: PaginationArgs,
    filter: LugaresFilterArgs,
  ): Promise<Lugar[]> {
    return this.crudService.findAll(this.tableName, pagination, filter);
  }

  async count(): Promise<number> {
    return this.queryService.count('lugares_geo');
  }

  async findOne(id: number): Promise<Lugar> {
    return this.crudService.findOne(this.tableName, id);
  }

  async update(input: UpdateLugaresInput): Promise<Lugar> {
    const { id, ...dto } = input;
    return this.crudService.updateOne(this.tableName, id, dto);
  }

  async remove(id: number) {
    const childrenPlaces = await this.queryService.count(
      'integrantes',
      `id_padre_lugar = ${id}`,
    );
    if (childrenPlaces > 0)
      throw new BadRequestException(
        'No se puede eliminar un lugar que tiene lugares hijos',
      );
    const referencedRows = await Promise.all([
      this.queryService.count('escuelas_samba', `id_ciudad = ${id}`),
      this.queryService.count('premios_especiales', `id_lugar = ${id}`),
      this.queryService.count('patroc_juridicos', `id_lugar = ${id}`),
    ]);
    const totalReferencedRows = referencedRows.reduce(
      (acc, curr) => acc + curr,
      0,
    );
    if (totalReferencedRows > 0)
      throw new BadRequestException(
        `No se puede eliminar el lugar porque tiene ${totalReferencedRows} referencia${
          totalReferencedRows > 1 ? 's' : ''
        } en otra${totalReferencedRows > 1 ? 's' : ''}  tabla${
          totalReferencedRows > 1 ? 's' : ''
        } `,
      );
    return this.crudService.delete(this.tableName, { id });
  }
}
