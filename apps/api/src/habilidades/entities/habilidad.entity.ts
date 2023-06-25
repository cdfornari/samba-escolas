import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Habilidad {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  nombre: string;

  @Field(() => String, { nullable: true })
  descripcion: string;
}
