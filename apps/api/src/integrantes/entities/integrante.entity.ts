import { ObjectType, Field, Int } from '@nestjs/graphql';
import { DateScalar } from 'src/common/scalars/date.scalar';
import { GenreTypeEnum } from '../enums/genre.enum';

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

  @Field(() => GenreTypeEnum)
  genero: GenreTypeEnum;

  @Field({ nullable: true })
  rg: string;
}
