import { IsInt, IsPositive } from 'class-validator';
import { CreateLugaresInput } from './create-lugares.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLugaresInput extends PartialType(CreateLugaresInput) {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  id: number;
}
