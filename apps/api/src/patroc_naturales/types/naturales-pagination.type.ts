import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Naturales } from '../entities/naturales.entity';

@ObjectType()
export class NaturalesPaginationType {
  @Field(() => [Naturales])
  items: Naturales[];

  @Field(() => Int)
  numberOfPages: number;
}
