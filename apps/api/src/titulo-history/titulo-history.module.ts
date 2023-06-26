import { Module } from '@nestjs/common';
import { TituloHistoryService } from './titulo-history.service';
import { TituloHistoryResolver } from './titulo-history.resolver';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [TituloHistoryResolver, TituloHistoryService],
})
export class TituloHistoryModule {}
