import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Lugare {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
