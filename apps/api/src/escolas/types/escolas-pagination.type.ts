import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Escola } from '../entities/escola.entity';

@ObjectType()
export class EscolasPaginationType {
  @Field(() => [Escola])
  items: Escola[];

  @Field(() => Int)
  numberOfPages: number;
}
