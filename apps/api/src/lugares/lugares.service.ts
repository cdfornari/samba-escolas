import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLugaresInput } from './dto/create-lugares.input';
import { UpdateLugareInput } from './dto/update-lugare.input';
import { QueryService } from 'src/common/services/query.service';
import { Lugar } from './entities/lugar.entity';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { LugaresFilterArgs } from './types/lugares-filter.args';

@Injectable()
export class LugaresService {
  constructor(private readonly queryService: QueryService) {}

  create(createLugaresInput: CreateLugaresInput) {
    const { nombre, tipo, id_padre_lugar } = createLugaresInput;
    if (tipo !== 'region' && !id_padre_lugar)
      throw new BadRequestException('id del padre requerido');
    return this.queryService.insert(
      'lugares_geo',
      ['nombre', 'tipo', 'id_padre_lugar'],
      [nombre, tipo, id_padre_lugar],
    );
  }

  async findAll(
    pagination: PaginationArgs,
    filter: LugaresFilterArgs,
  ): Promise<Lugar[]> {
    return this.queryService.select<Lugar[]>(
      'lugares_geo',
      null,
      `${filter.tipo ? `tipo = '${filter.tipo}'` : ''}`,
      null,
      pagination,
    );
  }

  async count(): Promise<number> {
    return this.queryService.count('lugares_geo');
  }

  async findOne(id: number): Promise<Lugar> {
    return (
      await this.queryService.select('lugares_geo', null, `id = ${id}`)
    )[0];
  }

  update(id: number, updateLugareInput: UpdateLugareInput) {
    return `This action updates a #${id} lugare`;
  }

  remove(id: number) {
    return `This action removes a #${id} lugare`;
  }
}
