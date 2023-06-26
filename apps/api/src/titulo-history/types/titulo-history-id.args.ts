import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsDateString, IsInt, IsPositive } from 'class-validator';

@ArgsType()
export class TituloHistoryIdArgs {
    @IsInt()
    @IsPositive()
    @Field(() => Int)
    year: number;
  
    @IsInt()
    @IsPositive()
    @Field(() => Int)
    id_escuela: number;

}
