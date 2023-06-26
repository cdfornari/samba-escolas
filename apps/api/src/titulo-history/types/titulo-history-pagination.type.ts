import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TituloHistory } from '../entities/titulo-history.entity';

@ObjectType()
export class TituloHistoryPaginationType {
  @Field(() => [TituloHistory])
  items: TituloHistory[];

  @Field(() => Int)
  numberOfPages: number;
}
