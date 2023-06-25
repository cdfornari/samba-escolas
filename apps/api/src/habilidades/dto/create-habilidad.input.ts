import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateHabilidadInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  @Field(() => String)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  descripcion: string;
}