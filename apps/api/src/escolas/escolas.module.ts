import { Module } from '@nestjs/common';
import { EscolasService } from './escolas.service';
import { EscolasResolver } from './escolas.resolver';

@Module({
  providers: [EscolasResolver, EscolasService]
})
export class EscolasModule {}
