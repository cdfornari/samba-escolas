import { ArgsType, Field, Int } from '@nestjs/graphql';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { DateScalar } from 'src/common/scalars/date.scalar';

@ArgsType()
export class SambasFilterArgs {
  
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  id_samba: number;
  
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  id_escuela: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  id_integrante: number;

  @IsDateString()
  @IsOptional()
  @Field(() => DateScalar, { nullable: true })
  fecha_inicio: Date;
}
