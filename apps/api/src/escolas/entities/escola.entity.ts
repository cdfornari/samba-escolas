import { ObjectType, Field, Int } from '@nestjs/graphql';
import { DateScalar } from 'src/common/scalars/date.scalar';

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

  @Field(() => DateScalar)
  fecha_fundacion: Date;

  @Field(() => String)
  resumen_historico: string;

  @Field(() => Boolean, { nullable: true })
  gres: boolean;

  id_ciudad: number;
}
