import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { SambaTypeEnum } from '../enums/samba.enum';
import { SambasFilterArgs } from '../types/sambas-filter.args';

@InputType()
export class CreateSambaInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  @Field()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  letra: string;

  @IsInt()
  @IsPositive()
  @Field(() => Int)
  anual_carnv: number;

  @IsIn([
    'enredo',
    'deco',
    'emablo',
    'marchinha',
    'frevo',
    'maracatu',
    'reggae',
  ])
  @Field(() => SambaTypeEnum)
  tipo: SambaTypeEnum;

  @IsArray()
  @IsOptional()
  @Field(() => [SambasFilterArgs])
  id_integrantes?: SambasFilterArgs[];
}
