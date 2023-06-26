import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDateString, IsInt, IsOptional, IsPositive } from 'class-validator';
import { DateScalar } from 'src/common/scalars/date.scalar';

@InputType()
export class CreateGanadoresInput {
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  year: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  id_premio: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  id_escuela?: number;

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
