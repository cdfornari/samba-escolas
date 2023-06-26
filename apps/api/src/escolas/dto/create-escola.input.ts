import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { DateScalar } from 'src/common/scalars/date.scalar';

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

  @IsDateString()
  @Field(() => DateScalar)
  fecha_fundacion: Date;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  resumen_historico: string;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  gres: boolean;

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_ciudad: number;

  @IsInt({ each: true })
  @IsPositive({ each: true })
  @IsArray()
  @IsOptional()
  @Field(() => [Int])
  id_colores?: number[];
}
