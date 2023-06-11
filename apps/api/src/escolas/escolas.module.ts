import { Module } from '@nestjs/common';
import { EscolasService } from './escolas.service';
import { EscolasResolver } from './escolas.resolver';
import { CommonModule } from 'src/common/common.module';
import { LugaresModule } from 'src/lugares/lugares.module';

@Module({
  imports: [CommonModule, LugaresModule],
  providers: [EscolasResolver, EscolasService],
})
export class EscolasModule {}
