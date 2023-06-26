import { ArgsType, Field, Int } from '@nestjs/graphql';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { DateScalar } from 'src/common/scalars/date.scalar';

@ArgsType()
export class SambasFilterIdsArgs {
  
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  id_escuela: number;

}
