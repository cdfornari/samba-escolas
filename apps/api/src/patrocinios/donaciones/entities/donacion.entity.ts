import { ObjectType, Field, Int } from '@nestjs/graphql';
import { DateScalar } from 'src/common/scalars/date.scalar';

@ObjectType()
export class Donacion{

  @Field(()=>Int)
  id: number;

  @Field(()=>Int)
  id_patroc: number;

  id_escuela: number;

  @Field(() => DateScalar)
  fecha: Date;

  @Field(()=>Int)
  monto: number;

}
