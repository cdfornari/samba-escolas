import { registerEnumType } from '@nestjs/graphql';

export enum EventoTypeEnum {
  n_samba = 'n_samba',
  general = 'general'
}

registerEnumType(EventoTypeEnum, {
  name: 'EventoType',
  description: 'Tipos de eventos',
});
