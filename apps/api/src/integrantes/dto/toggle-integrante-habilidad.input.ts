import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsPositive } from 'class-validator';

@InputType()
export class ToggleIntegranteHabilidadInput {
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_integrante: number;

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_habilidad: number;
}
