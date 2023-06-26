import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Donacion } from '../entities/donacion.entity';

@ObjectType()
export class DonacionPaginationType {
  @Field(() => [Donacion])
  items: Donacion[];

  @Field(() => Int)
  numberOfPages: number;
}
