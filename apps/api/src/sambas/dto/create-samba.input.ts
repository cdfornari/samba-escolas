import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { SambaTypeEnum } from '../enums/samba.enum';

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
  @Min(1920)
  @Max(2023)
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
}
