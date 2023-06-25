import { Injectable } from '@nestjs/common';
import { QueryService } from './query.service';
import { PaginationArgs } from '../dto/args/pagination.args';

@Injectable()
export class CRUDService {
  constructor(private readonly queryService: QueryService) {}

  async create<T, I>(tableName, input: I): Promise<T> {
    let fields = Object.keys(input);
    let values = Object.values(input);
    fields = fields.filter((field) => !!input[field]);
    values = values.filter((value) => !!value);
    return (await this.queryService.insert<T>(tableName, fields, values))[0];
  }

  async findAll<T, F extends { [key: string]: any; type?: 'OR' | 'AND' }>(
    tableName: string,
    pagination?: PaginationArgs,
    filter?: F,
  ): Promise<T[]> {
    return this.queryService.select<T[]>(
      tableName,
      null,
      filter && Object.keys(filter).length > 0
        ? `
        ${Object.keys(filter)
          .map((key) => `${key} = '${filter[key]}'`)
          .join(` ${filter?.type || ''} `)}
      `
        : null,
      null,
      pagination,
    );
  }

  async findOne(tableName: string, id: number) {
    return (await this.queryService.select(tableName, null, `id = ${id}`))[0];
  }

  async updateOne<T, I extends { [key: string]: any }>(
    tableName: string,
    id: number,
    input: I,
  ): Promise<T> {
    return (
      await this.queryService.update(tableName, input, `id = ${id}`)
    )[0][0];
  }

  delete<F extends { [key: string]: any; type?: 'OR' | 'AND' }>(
    tableName: string,
    filter: F,
  ) {
    return this.queryService.delete(
      tableName,
      filter && Object.keys(filter).length > 0
        ? `
        ${Object.keys(filter)
          .map((key) => `${key} = '${filter[key]}'`)
          .join(` ${filter?.type || ''} `)}
      `
        : null,
    );
  }
}
