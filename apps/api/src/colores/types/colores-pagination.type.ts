import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Color } from '../entities/color.entity';

@ObjectType()
export class ColorPaginationType {
  @Field(() => [Color])
  items: Color[];

  @Field(() => Int)
  numberOfPages: number;
}
