import { InputType, Int, Field } from '@nestjs/graphql';
import { IsIn, IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { PremioTypeEnum } from '../enums/tipo-premio.enum';

@InputType()
export class CreatePremioInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  nombre: string;

  @IsIn(['integrante', 'escola'])
  @Field( () => PremioTypeEnum )
  tipo: PremioTypeEnum;

  @IsString()
  @IsNotEmpty()
  @Field()
  descripcion: string;

  @IsInt()
  @IsPositive()
  @Field( () => Int )
  id_lugar: number;
}
