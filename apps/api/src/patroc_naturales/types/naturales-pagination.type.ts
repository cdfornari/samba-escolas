import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Natural } from '../entities/naturales.entity';

@ObjectType()
export class NaturalesPaginationType {
  @Field(() => [Natural])
  items: Natural[];

  @Field(() => Int)
  numberOfPages: number;
}
