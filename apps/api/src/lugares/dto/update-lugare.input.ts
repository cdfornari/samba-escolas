import { CreateLugareInput } from './create-lugare.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLugareInput extends PartialType(CreateLugareInput) {
  @Field(() => Int)
  id: number;
}
