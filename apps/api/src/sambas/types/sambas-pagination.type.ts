import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Samba } from '../entities/samba.entity';

@ObjectType()
export class SambaPaginationType {
  @Field(() => [Samba])
  items: Samba[];

  @Field(() => Int)
  numberOfPages: number;
}
