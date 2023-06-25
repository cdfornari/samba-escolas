import { IsInt, IsPositive } from 'class-validator';
import { CreateJuridicoInput } from './create-juridico.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateJuridicoInput extends PartialType(CreateJuridicoInput) {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  id: number;
}