import { IsInt, IsPositive } from 'class-validator';
import { CreateHabilidadInput } from './create-habilidad.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHabilidadInput extends PartialType(CreateHabilidadInput) {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  id: number;
}
