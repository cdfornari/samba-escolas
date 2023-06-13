import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Lugar } from '../entities/lugar.entity';

@ObjectType()
export class LugaresPaginationType {
  @Field(() => [Lugar])
  items: Lugar[];

  @Field(() => Int)
  numberOfPages: number;
}
