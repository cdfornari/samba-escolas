import { Module } from '@nestjs/common';
import { EscolasService } from './escolas.service';
import { EscolasResolver } from './escolas.resolver';
import { CommonModule } from 'src/common/common.module';
import { LugaresModule } from 'src/lugares/lugares.module';
import { IntegranteHistoryService } from './integrante-history/integrante-history.service';
import { IntegranteHistoryResolver } from './integrante-history/integrante-history.resolver';
import { IntegrantesModule } from 'src/integrantes/integrantes.module';

@Module({
  imports: [CommonModule, LugaresModule, IntegrantesModule],
  providers: [
    EscolasResolver,
    EscolasService,
    IntegranteHistoryService,
    IntegranteHistoryResolver,
  ],
})
export class EscolasModule {}
