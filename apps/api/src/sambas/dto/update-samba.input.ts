import { IsInt, IsPositive } from 'class-validator';
import { CreateSambaInput } from './create-samba.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSambaInput extends PartialType(CreateSambaInput) {
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id: number;
}
