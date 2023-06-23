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

  remove(id: number) {
    return `This action removes a #${id} lugare`;
  }
}
