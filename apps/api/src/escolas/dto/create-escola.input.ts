import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateEscolaInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  nombre: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  descripcion?: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  direccion_sede: string;

  @IsNumber()
  @Field(() => Int)
  numero: number;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  cep: string;

  @IsDate()
  @Field(() => Date)
  fecha_fundacion: Date;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  resumen_historico: string;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  gres: boolean;

  //TODO: CIUDAD
}
