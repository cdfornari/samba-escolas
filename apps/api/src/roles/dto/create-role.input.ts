import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateRoleInput {
  
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Field()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @Field()
  descripcion: string;
}
