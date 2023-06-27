import { InputType, Int, Field, Float } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Max,
  Min
} from 'class-validator';

@InputType()
export class CreateTituloHistoryInput {
  @IsInt()
  @Min(1920)
  @Max(2023)
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
