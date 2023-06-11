import { PaginationArgs } from '../dto/args/pagination.args';

export const getNumberOfPages = (pagination: PaginationArgs, count: number) =>
  Math.ceil(count / pagination.perPage);
