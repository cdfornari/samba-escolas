import { Module } from '@nestjs/common';
import { SambasService } from './sambas.service';
import { SambasResolver } from './sambas.resolver';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [SambasResolver, SambasService],
})
export class SambasModule {}
