import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTelefonoInput } from './dto/create-telefono.input';
import { UpdateTelefonoInput } from './dto/update-telefono.input';
import { QueryService } from 'src/common/services/query.service';
import { CRUDService } from 'src/common/services/crud.service';
import { Telefono } from './entities/telefono.entity';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { TelefonosFilterArgs } from './types/telefonos-filter.args';
import { TelefonosIdArgs } from './types/telefonos-id.args';

@Injectable()
export class TelefonosService {
  constructor(
    private readonly queryService: QueryService,
    private readonly crudService: CRUDService,
  ) {}

  private tableName = 'telefonos';

  async create(input: CreateTelefonoInput): Promise<Telefono> {
    const numberArray = [input.id_escuela, input.id_jur, input.id_nat];
    const checkValor = numberArray.filter((valor) => typeof valor === 'number');
    if (checkValor.length !== 1)
      throw new BadRequestException('Only 1 FK must be provided');
    return this.crudService.create(this.tableName, input);
  }

  async findAll(filter: TelefonosIdArgs): Promise<Telefono[]> {
    let pagination: PaginationArgs;
    return this.crudService.findAll(this.tableName, pagination, filter);
  }

  async count(): Promise<number> {
    return this.queryService.count(this.tableName);
  }

  async findOne(telefonoFilterArgs: TelefonosFilterArgs): Promise<Telefono> {
    const { cod_area, cod_int, numero } = telefonoFilterArgs;
    return (
      await this.queryService.select(
        this.tableName,
        null,
        `cod_int = ${cod_int} AND cod_area = ${cod_area} AND numero = ${numero}`,
      )
    )[0];
  }

  remove(cod_int: number, cod_area: number, numero: number) {
    return this.crudService.delete(this.tableName, {
      cod_int: cod_int,
      cod_area: cod_area,
      numero: numero,
    });
  }
}
