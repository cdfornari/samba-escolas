import { Module } from '@nestjs/common';
import { TelefonosService } from './telefonos.service';
import { TelefonosResolver } from './telefonos.resolver';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [TelefonosResolver, TelefonosService]
})
export class TelefonosModule {}
