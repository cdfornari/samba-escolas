import { ObjectType, Field, Int } from '@nestjs/graphql';
import { DateScalar } from 'src/common/scalars/date.scalar';
import { GenderTypeEnum } from '../enums/gender.enum';

@ObjectType()
export class Integrante {
  @Field(() => Int)
  id: number;

  @Field()
  nombre1: string;

  @Field({ nullable: true })
  nombre2: string;

  @Field()
  apellido1: string;

  @Field()
  apellido2: string;

  @Field({ nullable: true })
  apodo: string;

  @Field(() => DateScalar)
  fecha_nacimiento: Date;

  @Field()
  nacionalidad: string;

  @Field(() => GenderTypeEnum)
  genero: GenderTypeEnum;

  @Field({ nullable: true })
  rg: string;
}
