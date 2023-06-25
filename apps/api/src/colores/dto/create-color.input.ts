import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateColorInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  nombre: string;
}