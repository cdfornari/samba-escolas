import { PaginationArgs } from '../dto/args/pagination.args';
import { PaginationInfo } from '../types/pagination-info.type';

export const getPaginatioInfo = (
  pagination: PaginationArgs,
  count: number,
): PaginationInfo => ({
  hasNextPage: count > pagination.page * pagination.perPage,
  hasPreviousPage: pagination.page > 1,
  numberOfPages: Math.ceil(count / pagination.perPage),
});
