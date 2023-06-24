import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Premio } from '../entities/premio.entity';

@ObjectType()
export class PremiosPaginationType {
  @Field(() => [Premio])
  items: Premio[];

  @Field(() => Int)
  numberOfPages: number;
}
