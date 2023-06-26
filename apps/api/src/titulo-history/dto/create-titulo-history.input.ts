import { InputType, Int, Field, Float } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateTituloHistoryInput {
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  year: number;

  @IsInt()
  @IsPositive()
  @Field(() => Int)
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
