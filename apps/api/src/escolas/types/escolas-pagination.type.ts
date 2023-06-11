import { Field, ObjectType } from '@nestjs/graphql';
import { Escola } from '../entities/escola.entity';
import { PaginationInfo } from 'src/common/types/pagination-info.type';

@ObjectType()
export class EscolasPaginationType {
  @Field(() => [Escola])
  items: Escola[];

  @Field(() => PaginationInfo)
  paginationInfo: PaginationInfo;
}
