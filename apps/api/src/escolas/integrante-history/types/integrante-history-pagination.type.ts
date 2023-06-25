import { Field, Int, ObjectType } from '@nestjs/graphql';
import { HistoricoIntegrante } from '../entities/integrante-history.entity';

@ObjectType()
export class IntegranteHistoryPaginationType {
  @Field(() => [HistoricoIntegrante])
  items: HistoricoIntegrante[];

  @Field(() => Int)
  numberOfPages: number;
}
