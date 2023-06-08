import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Escola {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  nombre: string;

  @Field(() => String, { nullable: true })
  descripcion?: string;

  @Field(() => String)
  direccion_sede: string;

  @Field(() => Int)
  numero: number;

  @Field(() => String)
  cep: string;

  @Field(() => Date)
  fecha_fundacion: Date;

  @Field(() => String)
  resumen_historico: string;

  @Field(() => Boolean, { nullable: true })
  gres: boolean;

  //TODO: CIUDAD 
}
