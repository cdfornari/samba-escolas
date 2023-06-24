import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
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
