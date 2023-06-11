import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationInfo {
  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Int)
  numberOfPages: number;
}
