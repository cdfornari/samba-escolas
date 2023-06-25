import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Juridico } from '../entities/juridico.entity';

@ObjectType()
export class JuridicoPaginationType {
  @Field(() => [Juridico])
  items: Juridico[];

  @Field(() => Int)
  numberOfPages: number;
}
