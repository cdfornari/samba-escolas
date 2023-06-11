import { Module } from '@nestjs/common';
import { EscolasService } from './escolas.service';
import { EscolasResolver } from './escolas.resolver';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [EscolasResolver, EscolasService],
})
export class EscolasModule {}
