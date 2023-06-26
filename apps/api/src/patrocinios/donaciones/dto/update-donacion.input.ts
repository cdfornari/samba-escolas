import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

@InputType()
export class UpdateDonacionInput {

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id: number;

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_escuela: number;

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_patroc: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Field(() => Int,{nullable:true})
  monto?: number;

  @IsDateString()
  @IsOptional()
  @Field(() => Int,{nullable:true})
  fecha?: Date;
}
