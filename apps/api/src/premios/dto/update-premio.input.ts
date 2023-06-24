import { CreatePremioInput } from './create-premio.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePremioInput extends PartialType(CreatePremioInput) {
  @Field(() => Int)
  id: number;
}
