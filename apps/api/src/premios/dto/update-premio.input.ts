import { IsInt, IsPositive } from 'class-validator';
import { CreatePremioInput } from './create-premio.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePremioInput extends PartialType(CreatePremioInput) {
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id: number;
}
