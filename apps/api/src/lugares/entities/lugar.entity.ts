import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Lugar {
  @Field(() => Int)
  id: number;
}
