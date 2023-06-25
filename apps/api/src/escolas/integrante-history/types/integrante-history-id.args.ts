import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsDateString, IsInt, IsPositive } from 'class-validator';
import { DateScalar } from 'src/common/scalars/date.scalar';

@ArgsType()
export class HistoricoIntegranteIdArgs {
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_escuela: number;

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_integrante: number;

  @IsDateString()
  @Field(() => DateScalar)
  fecha_inicio: Date;
}
