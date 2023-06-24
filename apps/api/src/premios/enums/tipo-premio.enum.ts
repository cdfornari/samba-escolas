import { registerEnumType } from '@nestjs/graphql';

export enum PremioTypeEnum {
  integrante = 'integrante',
  escola = 'escola',
}

registerEnumType(PremioTypeEnum, {
  name: 'PremioType',
  description: 'Tipos de premios especiales',
});
