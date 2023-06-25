import { IsInt, IsPositive } from 'class-validator';
import { CreateNaturalesInput } from './create-naturales.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNaturalesInput extends PartialType(CreateNaturalesInput) {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  id: number;
}