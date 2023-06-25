import { Field, InputType} from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateNaturalesInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  @Field()
  nombre1: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  @Field()
  apellido1: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  @Field()
  apellido2: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  @Field()
  rg: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(35)
  @Field()
  email: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(15)
  @Field()
  nombre2?: string;
}