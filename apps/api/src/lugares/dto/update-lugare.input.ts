import { CreateLugaresInput } from './create-lugares.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLugareInput extends PartialType(CreateLugaresInput) {
  @Field(() => Int)
  id: number;
}
