import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateJuridicoInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Field()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(18)
  @Field()
  cnpj: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(35)
  @Field()
  email: string;

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_lugar:number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(50)
  @Field()
  dir?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Field(() => Int)
  numero:number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(9)
  @Field()
  cep?: string;
}