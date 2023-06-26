import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsDateString, IsDecimal, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { DateScalar } from 'src/common/scalars/date.scalar';
import { EventoTypeEnum } from '../enums/tipo-evento.enum';

@InputType()
export class CreateEventoInput {
  
  @IsInt()
  @IsPositive()
  @Field(() => Int)
  id_escuela: number;

  @IsDateString()
  @Field( () => DateScalar)
  fecha_inicio: Date;

  @IsDateString()
  @Field( () => DateScalar)
  fecha_fin: Date;

  @IsIn(['n_samba', 'general'])
  @Field( () => EventoTypeEnum )
  tipo: EventoTypeEnum;

  @IsString()
  @IsNotEmpty()
  @Field()
  nombre: string;
  
  @IsNumber({maxDecimalPlaces: 2})
  @IsPositive()
  @Field(() => Float)
  costo_unit: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Field(() => String, {nullable: true})
  descripcion?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Field(() => Int, {nullable: true})
  asist_total?: number;
}
