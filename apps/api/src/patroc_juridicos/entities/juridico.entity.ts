import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Juridico {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  nombre: string;

  @Field(() => String)
  cnpj: string;

  @Field(() => String)
  email: string;

  @Field(() => Int, { nullable: true })
  id_lugar?: number;

  @Field(() => String, { nullable: true })
  dir?: string;

  @Field(() => Int, { nullable: true })
  numero?: number;

  @Field(() => Int, { nullable: true })
  cep?: number;

}
