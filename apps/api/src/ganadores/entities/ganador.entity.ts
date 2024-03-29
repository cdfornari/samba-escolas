import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Ganador {
  @Field(() => Int)
  year: number;

  id_premio: number;

  id_escuela?: number;

  id_escuela_integrante?: number;

  fecha_inicio?: Date;

  id_integrante?: number;

  id_escola?: number;
}
