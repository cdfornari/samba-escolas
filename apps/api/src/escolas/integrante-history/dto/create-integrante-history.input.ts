import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { DateScalar } from 'src/common/scalars/date.scalar';

@InputType()
export class CreateHistoricoIntegranteInput {
  @IsDateString()
  @Field(() => DateScalar)
  fecha_inicio: Date;

  @IsDateString()
  @IsOptional()
  @Field(() => DateScalar, { nullable: true })
  fecha_fin?: Date;

  @IsBoolean()
  @Field()
  autoridad: boolean;

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_integrante: number;

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_escuela: number;
}
