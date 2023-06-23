import { registerEnumType } from '@nestjs/graphql';

export enum GenreTypeEnum {
  M = 'M',
  F = 'F',
}

registerEnumType(GenreTypeEnum, {
  name: 'GenreType',
  description: 'Géneros de integrantes',
});
