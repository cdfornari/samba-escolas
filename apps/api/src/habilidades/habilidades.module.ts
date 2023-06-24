import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { HabilidadService } from './habilidades.service';

@Module({
  providers: [HabilidadService]
})
export class HabilidadesModule {
    imports: [CommonModule]
}
