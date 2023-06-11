import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PaginationArgs } from '../dto/args/pagination.args';

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
    orderBy?: string,
    pagination?: PaginationArgs,
  ): Promise<T> {
    return await this.dataSource.query(
      `SELECT ${fields ? fields.join(',') : '*'} FROM ${table} ${
        where ? `WHERE ${where}` : ''
      } ${orderBy ? `ORDER BY ${orderBy}` : ''} ${
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
      `INSERT INTO ${table} (${fields.join(',')}) VALUES (${values.join(
        ',',
      )}) RETURNING *`,
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
      } RETURNING *`,
    );
  }

  async count(table: string, where?: string): Promise<number> {
    return (
      await this.dataSource.query(
        `SELECT COUNT(*) FROM ${table} ${where ? `WHERE ${where}` : ''}`,
      )
    )[0].count;
  }
}
