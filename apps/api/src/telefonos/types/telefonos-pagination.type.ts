import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Telefono } from '../entities/telefono.entity';

@ObjectType()
export class TelefonoPaginationType {
  @Field(() => [Telefono])
  items: Telefono[];

  @Field(() => Int)
  numberOfPages: number;
}
