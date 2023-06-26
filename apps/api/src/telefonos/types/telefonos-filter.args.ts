import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsPositive } from 'class-validator';

@ArgsType()
export class TelefonosFilterArgs {
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  cod_int: number;

  @IsInt()
  @IsPositive()
  @Field( () => Int)
  cod_area: number;

  @IsInt()
  @IsPositive()
  @Field( () => Int)
  numero: number; 
}
