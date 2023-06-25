import { IsInt, IsPositive } from 'class-validator';
import { CreateColorInput } from './create-color.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateColorInput extends PartialType(CreateColorInput) {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  id: number;
}