import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsPositive } from 'class-validator';

@InputType()
export class ToggleEscolaColorInput {
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_escuela: number;

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_color: number;
}
