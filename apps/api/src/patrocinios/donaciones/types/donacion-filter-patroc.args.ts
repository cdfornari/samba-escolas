import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsPositive } from 'class-validator';

@ArgsType()
export class DonacionFilterPatrocArgs {
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_patroc: number;
}
