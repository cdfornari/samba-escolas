import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class TituloHistory {
  
  @Field( () => Int)
  year: number;

  id_escuela: number;

  @Field( () => Float, {nullable: true})
  monto?: number;

  @Field( () => String, {nullable: true})
  grupo: string;

}
