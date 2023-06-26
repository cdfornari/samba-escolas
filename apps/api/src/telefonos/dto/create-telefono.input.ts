import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNumber, IsOptional, IsPositive } from 'class-validator';

@InputType()
export class CreateTelefonoInput {
  
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

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Field( () => Int, {nullable: true})
  id_escuela?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Field( () => Int, {nullable: true})
  id_jur?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Field( () => Int, {nullable: true})
  id_nat?: number; 
}
