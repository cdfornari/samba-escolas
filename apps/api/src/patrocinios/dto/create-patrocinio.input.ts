import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { DateScalar } from 'src/common/scalars/date.scalar';

@InputType()
export class CreatePatrocinioInput {
  @IsNumber()
  @IsPositive()
  @Field(() => Int)
  id_escuela: number;

  @IsDateString()
  @Field(() => DateScalar)
  fecha_inicio: Date;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Field(() => Int)
  id_jur?:number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Field(() => Int)
  id_nat?:number;

  @IsDateString()
  @IsOptional()
  @Field(() => DateScalar)
  fin?: Date;
}
