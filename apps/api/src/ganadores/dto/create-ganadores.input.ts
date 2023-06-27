import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDateString, IsInt, IsOptional, IsPositive, Max, Min } from 'class-validator';
import { DateScalar } from 'src/common/scalars/date.scalar';

@InputType()
export class CreateGanadoresInput {
  @IsInt()
  @Min(1920)
  @Max(2023)
  @IsPositive()
  @Field(() => Int)
  year: number;

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_premio: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  id_escuela?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  id_escuela_integrante?: number;

  @IsDateString()
  @IsOptional()
  @Field(() => DateScalar, { nullable: true })
  fecha_inicio?: Date;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  id_integrante?: number;
}
