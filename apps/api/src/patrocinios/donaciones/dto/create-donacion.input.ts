import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { DateScalar } from 'src/common/scalars/date.scalar';

@InputType()
export class CreateHistoricoIntegranteInput {

  @IsNumber()
  @IsPositive()
  @Field(() => Int)
  id_escuela: number;

  @IsDateString()
  @Field(() => DateScalar)
  fecha_inicio: Date;

  @IsNumber()
  @IsPositive()
  @Field(() => Int)
  id_jur?:number;

  @IsNumber()
  @IsPositive()
  @Field(() => Int)
  id_nat?:number;

  @IsDateString()
  @Field(() => DateScalar)
  fin?: Date;
}
