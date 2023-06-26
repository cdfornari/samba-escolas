import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PaginationArgs } from '../dto/args/pagination.args';

type FieldValueType = string | number | boolean | Date;

@Injectable()
export class QueryService {
  constructor(private readonly dataSource: DataSource) {}

  private readonly tablesPrefix = 'csd_';

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
      `SELECT ${fields ? fields.join(',') : '*'} FROM ${
        this.tablesPrefix + table
      } ${where ? `WHERE ${where}` : ''} ${
        orderBy ? `ORDER BY ${orderBy}` : ''
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
    values: FieldValueType[],
  ): Promise<T> {
    return await this.dataSource.query(
      `INSERT INTO ${this.tablesPrefix + table} (${fields.join(
        ',',
      )}) VALUES (${values.map((v) => `'${v}'`).join(',')}) RETURNING *`,
    );
  }

  async update<T>(
    table: string,
    dto: {
      [key: string]: FieldValueType;
    },
    where?: string,
  ): Promise<T> {
    return await this.dataSource.query(
      `UPDATE ${this.tablesPrefix + table} 
      SET ${Object.keys(dto)
        .map((key) => `${key} = '${dto[key]}'`)
        .join(', ')} 
      ${where ? `WHERE ${where}` : ''} RETURNING *`,
    );
  }

  async count(table: string, where?: string): Promise<number> {
    return (
      await this.dataSource.query(
        `SELECT COUNT(*) FROM ${this.tablesPrefix + table} ${
          where ? `WHERE ${where}` : ''
        }`,
      )
    )[0].count;
  }

  async delete(table: string, where?: string): Promise<boolean> {

    return (
      (
        await this.dataSource.query(
          `DELETE FROM ${this.tablesPrefix + table} ${
            where ? `WHERE ${where}` : ''
          }`,
        )
      )[1] > 0
    );
  }
}
