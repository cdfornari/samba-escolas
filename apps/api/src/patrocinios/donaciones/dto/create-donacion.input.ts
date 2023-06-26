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
export class CreateDonacionInput {

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_escuela: number;

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_patroc: number;

  @IsDateString()
  @Field(() => DateScalar)
  fecha: Date;

  @IsNumber()
  @IsPositive()
  @Field(() => Int)
  monto:number;

}
