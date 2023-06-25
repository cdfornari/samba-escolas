import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsDateString, IsInt, IsPositive } from 'class-validator';
import { DateScalar } from 'src/common/scalars/date.scalar';

@ArgsType()
export class TelefonosIdArgs {
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_escuela: number;

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_jur: number;

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_nat: number;
}
