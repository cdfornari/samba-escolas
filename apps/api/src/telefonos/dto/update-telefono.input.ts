import { IsInt, IsPositive } from 'class-validator';
import { CreateTelefonoInput } from './create-telefono.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTelefonoInput extends PartialType(CreateTelefonoInput) {

  @IsInt()
  @IsPositive()
  @Field( () => Int)
  cod_int: number;

  @IsInt()
  @IsPositive()
  @Field( () => Int)
  cod_area: number;

  @IsInt()
  @IsPositive()
  @Field( () => Int)
  numero: number;

}
