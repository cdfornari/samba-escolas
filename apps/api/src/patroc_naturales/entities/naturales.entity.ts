import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Natural {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  nombre1: string;

  @Field(() => String)
  apellido1: string;

  @Field(() => String)
  apellido2: string;

  @Field(() => String)
  rg: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  nombre2: string;

}
