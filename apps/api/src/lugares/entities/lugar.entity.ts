import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PlaceTypeEnum } from '../enums/place-type.enum';
import { Place } from '../types/place.type';

@ObjectType()
export class Lugar {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  nombre: string;

  @Field(() => PlaceTypeEnum)
  tipo: Place;

  id_padre_lugar?: number;
}
