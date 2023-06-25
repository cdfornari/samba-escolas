import { Module } from '@nestjs/common';
import { PatrociniosService } from './patrocinios.service';
import { PatrociniosResolver } from './patrocinios.resolver';
import { CommonModule } from 'src/common/common.module';
import { LugaresModule } from 'src/lugares/lugares.module';
import { IntegrantesModule } from 'src/integrantes/integrantes.module';

@Module({
  imports: [CommonModule, LugaresModule, IntegrantesModule],
  providers: [
    PatrociniosResolver,
    PatrociniosService,
  ],
})
export class PatrociniosModule {}
