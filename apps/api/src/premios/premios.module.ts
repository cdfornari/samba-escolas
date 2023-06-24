import { Module } from '@nestjs/common';
import { PremiosService } from './premios.service';
import { PremiosResolver } from './premios.resolver';
import { CommonModule } from 'src/common/common.module';

@Module({
  providers: [PremiosResolver, PremiosService],
  imports: [CommonModule],
})
export class PremiosModule {}
