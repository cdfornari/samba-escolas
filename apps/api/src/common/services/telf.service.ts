import { Injectable } from '@nestjs/common';
import { QueryService } from './query.service';
import { PaginationArgs } from '../dto/args/pagination.args';

@Injectable()
export class TelfService {
  constructor(private readonly queryService: QueryService) {}

  async findOne(tableName: string, cod_int: number, cod_area: number, numero: number) {
    return (await this.queryService.select(tableName, null, `cod_int = ${cod_int} AND cod_area = ${cod_area} AND numero = ${numero}`))[0];
  }

  async updateOne<T, I extends { [key: string]: any }>(
    tableName: string,
    cod_int: number, 
    cod_area: number, 
    numero: number,
    input: I,
  ): Promise<T> {
    return (
      await this.queryService.update(tableName, input, `cod_int = ${cod_int} AND cod_area = ${cod_area} AND numero = ${numero}`)
    )[0][0];
  }

  async remove(tableName: string, cod_int: number, cod_area: number, numero: number) {
    return `This action removes a #${cod_int} entity`;
  }
}
