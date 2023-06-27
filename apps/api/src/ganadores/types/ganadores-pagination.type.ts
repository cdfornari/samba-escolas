import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Ganador } from '../entities/ganador.entity';

@ObjectType()
export class GanadoresPaginationType {
  @Field(() => [Ganador])
  items: Ganador[];

  @Field(() => Int)
  numberOfPages: number;
}
