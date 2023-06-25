import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Patrocinio } from '../entities/patrocinio.entity';

@ObjectType()
export class PatrocinioPaginationType {
  @Field(() => [Patrocinio])
  items: Patrocinio[];

  @Field(() => Int)
  numberOfPages: number;
}
