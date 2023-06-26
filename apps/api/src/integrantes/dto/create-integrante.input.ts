import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { DateScalar } from 'src/common/scalars/date.scalar';
import { GenderTypeEnum } from '../enums/gender.enum';

@InputType()
export class CreateIntegranteInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  nombre1: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  nombre2: string;

  @IsString()
  @Field()
  apellido1: string;

  @IsString()
  @Field()
  apellido2: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  apodo: string;

  @IsDateString()
  @Field(() => DateScalar)
  fecha_nacimiento: Date;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  nacionalidad?: string;

  @IsIn(['M', 'F'])
  @Field(() => GenderTypeEnum)
  genero: GenderTypeEnum;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  rg: string;

  @IsInt({ each: true })
  @IsPositive({ each: true })
  @IsArray()
  @IsOptional()
  @Field(() => [Int])
  id_habilidades?: number[];
}
