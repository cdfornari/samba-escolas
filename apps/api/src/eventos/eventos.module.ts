import { Module } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { EventosResolver } from './eventos.resolver';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [EventosResolver, EventosService]
})
export class EventosModule {}
