import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { PremioTypeEnum } from '../enums/tipo-premio.enum';

@ObjectType()
export class Premio {
  @Field(() => Int)
  id: number;

  @Field()
  nombre: string;

  @Field(() => PremioTypeEnum)
  tipo: PremioTypeEnum;

  @Field()
  descripcion: string;

  id_lugar: number;
}
