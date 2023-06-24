import { IsInt, IsPositive } from 'class-validator';
import { CreateEscolaInput } from './create-escola.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEscolaInput extends PartialType(CreateEscolaInput) {
  
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id: number;
}
