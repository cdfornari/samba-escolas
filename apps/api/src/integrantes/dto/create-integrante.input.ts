import { InputType, Field } from '@nestjs/graphql';
import { IsDateString, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DateScalar } from 'src/common/scalars/date.scalar';

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
  @Field()
  genero: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  rg: string;
}
