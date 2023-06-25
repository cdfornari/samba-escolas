import { ObjectType, Field, Int } from '@nestjs/graphql';
import { DateScalar } from 'src/common/scalars/date.scalar';

@ObjectType()
export class HistoricoIntegrante {
  @Field(() => DateScalar)
  fecha_inicio: Date;

  @Field(() => DateScalar, { nullable: true })
  fecha_fin?: Date;

  @Field()
  autoridad: boolean;

  id_integrante: number;

  id_escola: number;
}
