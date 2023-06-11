import { registerEnumType } from '@nestjs/graphql';

export enum PlaceTypeEnum {
  region = 'region',
  estado = 'estado',
  ciudad = 'ciudad',
}

registerEnumType(PlaceTypeEnum, {
  name: 'PlaceType',
  description: 'Tipos de lugares',
});
