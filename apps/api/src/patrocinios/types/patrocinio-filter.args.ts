import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

@ArgsType()
export class PatrocinioFilterArgs {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Field(() => Int)
  id_escuela: number;
}
