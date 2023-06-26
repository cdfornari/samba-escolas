import { IsInt, IsPositive } from 'class-validator';
import { CreateEventoInput } from './create-evento.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEventoInput extends PartialType(CreateEventoInput) {
  
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id: number;

}
