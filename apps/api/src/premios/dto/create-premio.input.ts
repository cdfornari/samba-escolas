import { InputType, Int, Field } from '@nestjs/graphql';
import { IsIn, IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreatePremioInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  nombre: string;

  @IsIn(['integrante', 'escola'])
  @Field()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  descripcion: string;

  @IsInt()
  @IsPositive()
  @Field( () => Number )
  id_lugar: number;
}
