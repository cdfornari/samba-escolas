import { Module } from '@nestjs/common';
import { PatrociniosService } from './patrocinios.service';
import { PatrociniosResolver } from './patrocinios.resolver';
import { CommonModule } from 'src/common/common.module';
import { LugaresModule } from 'src/lugares/lugares.module';
import { EscolasModule } from 'src/escolas/escolas.module';
import { JuridicosModule } from 'src/patroc_juridicos/juridico.module';
import { NaturalesModule } from 'src/patroc_naturales/naturales.module';
import { LugaresResolver } from 'src/lugares/lugares.resolver';
import { LugaresService } from 'src/lugares/lugares.service';
import { JuridicosResolver } from 'src/patroc_juridicos/juridico.resolver';
import { JuridicosService } from 'src/patroc_juridicos/juridico.service';
import { NaturalesResolver } from 'src/patroc_naturales/naturales.resolver';
import { NaturalesService } from 'src/patroc_naturales/naturales.service';
import { EscolasResolver } from 'src/escolas/escolas.resolver';
import { EscolasService } from 'src/escolas/escolas.service';

@Module({
  imports: [CommonModule, EscolasModule, JuridicosModule, NaturalesModule],
  providers: [
    PatrociniosResolver,
    PatrociniosService,
    EscolasResolver,
    EscolasService,
    JuridicosResolver,
    JuridicosService,
    NaturalesResolver,
    NaturalesService,
  ],
})
export class PatrociniosModule {}
