import { Module } from '@nestjs/common';
import { GanadoresService } from './ganadores.service';
import { GanadoresResolver } from './ganadores.resolver';
import { CommonModule } from 'src/common/common.module';
import { PremiosModule } from 'src/premios/premios.module';

@Module({
  imports: [CommonModule, PremiosModule],
  providers: [GanadoresResolver, GanadoresService],
})
export class GanadoresModule {}
