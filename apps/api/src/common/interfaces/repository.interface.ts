import { PaginationArgs } from '../dto/args/pagination.args';

export interface Repository<T, I> {
  findMany: (pagination?: PaginationArgs) => Promise<T[]>;
  findOne: (id: I) => Promise<T>;
  save: (entity: T) => Promise<T>;
}
