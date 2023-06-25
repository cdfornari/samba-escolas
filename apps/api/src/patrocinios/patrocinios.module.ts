import { Module } from '@nestjs/common';
import { PatrociniosService } from './patrocinios.service';
import { PatrociniosResolver } from './patrocinios.resolver';
import { CommonModule } from 'src/common/common.module';
import { LugaresModule } from 'src/lugares/lugares.module';
import { EscolasModule } from 'src/escolas/escolas.module';
import { JuridicosModule } from 'src/patroc_juridicos/juridico.module';
import { NaturalesModule } from 'src/patroc_naturales/naturales.module';

@Module({
  imports: [CommonModule, LugaresModule, EscolasModule, JuridicosModule, NaturalesModule],
  providers: [
    PatrociniosResolver,
    PatrociniosService,
  ],
})
export class PatrociniosModule {}
