import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { HabilidadesService } from './habilidades.service';
import { HabilidadesResolver } from './habilidades.resolver';

@Module({
  imports: [CommonModule],
  providers: [HabilidadesResolver, HabilidadesService],
})
export class HabilidadesModule {
}
