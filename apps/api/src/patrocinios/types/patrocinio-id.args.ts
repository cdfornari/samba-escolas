import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsPositive } from 'class-validator';

@ArgsType()
export class PatrocinioIdArgs {
  
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id: number;
  
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_escuela: number;

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_patroc: number;
}
