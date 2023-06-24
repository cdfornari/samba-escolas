import { registerEnumType } from '@nestjs/graphql';

export enum GenderTypeEnum {
  M = 'M',
  F = 'F',
}

registerEnumType(GenderTypeEnum, {
  name: 'GenderType',
  description: 'Géneros de integrantes',
});
