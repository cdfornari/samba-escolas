import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsPositive } from 'class-validator';

@ArgsType()
export class EventosFilterArgs {
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_escuela: number;
}
