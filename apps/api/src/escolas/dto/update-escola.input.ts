import { CreateEscolaInput } from './create-escola.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEscolaInput extends PartialType(CreateEscolaInput) {
  @Field(() => Int)
  id: number;
}
