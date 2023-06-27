import { Module } from '@nestjs/common';
import { PremiosService } from './premios.service';
import { PremiosResolver } from './premios.resolver';
import { CommonModule } from 'src/common/common.module';
import { LugaresModule } from 'src/lugares/lugares.module';

@Module({
  providers: [PremiosResolver, PremiosService],
  imports: [CommonModule,LugaresModule],
  exports: [PremiosService],
})
export class PremiosModule {}
