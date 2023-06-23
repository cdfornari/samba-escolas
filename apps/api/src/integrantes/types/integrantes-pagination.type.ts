import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Integrante } from '../entities/integrante.entity';

@ObjectType()
export class IntegrantesPaginationType {
  @Field(() => [Integrante])
  items: Integrante[];

  @Field(() => Int)
  numberOfPages: number;
}
