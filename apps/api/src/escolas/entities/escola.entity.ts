import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Escola {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
