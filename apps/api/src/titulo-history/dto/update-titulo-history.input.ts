import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { CreateTituloHistoryInput } from './create-titulo-history.input';
import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';

@InputType()
export class UpdateTituloHistoryInput extends PartialType(
  CreateTituloHistoryInput,
) {
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  year: number;

  @IsInt()
  @IsPositive()
  id_escuela: number;

  @IsPositive()
  @IsOptional()
  @Field(() => Float, { nullable: true })
  monto?: number;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  @Field(() => String, { nullable: true })
  grupo?: string;
}
