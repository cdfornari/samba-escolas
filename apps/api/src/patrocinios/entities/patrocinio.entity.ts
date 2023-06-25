import { ObjectType, Field, Int } from '@nestjs/graphql';
import { DateScalar } from 'src/common/scalars/date.scalar';

@ObjectType()
export class Patrocinio {
  @Field(() => Int)
  id: number;

  id_escuela: number;

  @Field(() => DateScalar)
  fecha_inicio: Date;

  id_jur?:number;

  id_nat?:number;

  @Field(() => DateScalar)
  fin?: Date;
}
