import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Color {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  nombre: string;

}
