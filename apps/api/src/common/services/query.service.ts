import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PaginationArgs } from '../dto/args/pagination.args';
import { PaginationInfo } from '../types/pagination-info.type';

@Injectable()
export class QueryService {
  constructor(private readonly dataSource: DataSource) {}

  async executeRawQuery<T>(query: string): Promise<T> {
    return await this.dataSource.query(query);
  }

  async select<T>(
    table: string,
    fields?: string[],
    where?: string,
    pagination?: PaginationArgs,
  ): Promise<T> {
    return await this.dataSource.query(
      `SELECT ${fields.join(',') ?? '*'} FROM ${table} ${
        where ? `WHERE ${where}` : ''
      } ${
        pagination
          ? `LIMIT ${pagination.perPage} OFFSET ${
              (pagination.page - 1) * pagination.perPage
            }`
          : ''
      }`,
    );
  }

  async insert<T>(
    table: string,
    fields: string[],
    values: string[],
  ): Promise<T> {
    return await this.dataSource.query(
      `INSERT INTO ${table} (${fields.join(',')}) VALUES (${values.join(',')})`,
    );
  }

  async update<T>(
    table: string,
    fields: string[],
    values: string[],
    where?: string,
  ): Promise<T> {
    return await this.dataSource.query(
      `UPDATE ${table} SET (${fields.join(',')}) VALUES (${values.join(',')}) ${
        where ? `WHERE ${where}` : ''
      }`,
    );
  }

  async count(table: string, where?: string): Promise<number> {
    return this.dataSource.query(
      `SELECT COUNT(*) FROM ${table} ${where ? `WHERE ${where}` : ''}`,
    );
  }
}
