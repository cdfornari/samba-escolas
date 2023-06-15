import { Field, InputType } from '@nestjs/graphql';
import { IsIn, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import { PlaceTypeEnum } from '../enums/place-type.enum';

@InputType()
export class CreateLugaresInput {
  @IsString()
  @Field(() => String)
  nombre: string;

  @IsIn(['region', 'estado', 'ciudad'])
  @Field(() => PlaceTypeEnum)
  tipo: PlaceTypeEnum;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Field(() => Number, { nullable: true })
  id_padre_lugar: number;
}
