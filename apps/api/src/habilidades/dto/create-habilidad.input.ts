import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateHabilidadInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  descripcion: string;
}