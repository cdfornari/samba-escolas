import { registerEnumType } from '@nestjs/graphql';

export enum SambaTypeEnum {
   enredo = 'enredo',
   deco = 'deco',
   emablo = 'emablo',
   marchinha = 'marchinha',
   frevo = 'frevo',
   maracatu = 'maracatu',
   reggae = 'reggae'
}

registerEnumType(SambaTypeEnum, {
  name: 'SambaType',
  description: 'Tipos de sambas',
});