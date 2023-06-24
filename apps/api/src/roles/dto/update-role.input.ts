import { IsInt, IsPositive } from 'class-validator';
import { CreateRoleInput } from './create-role.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id: number;
}
