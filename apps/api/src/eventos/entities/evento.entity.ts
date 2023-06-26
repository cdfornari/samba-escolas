import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { EventoTypeEnum } from '../enums/tipo-evento.enum';
import { DateScalar } from 'src/common/scalars/date.scalar';

@ObjectType()
export class Evento {

  @Field(() => Int)
  id: number;

  id_escuela: number;

  @Field( () => DateScalar)
  fecha_inicio: Date;

  @Field( () => EventoTypeEnum )
  tipo: EventoTypeEnum;

  @Field()
  nombre: string;

  @Field(() => Float)
  costo_unit: number;

  @Field(() => String, {nullable: true})
  descripcion?: string;

  @Field(() => Int, {nullable: true})
  asist_total?: number;

}
