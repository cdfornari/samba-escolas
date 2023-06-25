import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateColorInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  @Field(() => String)
  nombre: string;
}