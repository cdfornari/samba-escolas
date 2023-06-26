import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { NaturalesService } from './naturales.service';
import { NaturalesResolver } from './naturales.resolver';

@Module({
  imports: [CommonModule],
  providers: [NaturalesResolver, NaturalesService],
})
export class NaturalesModule {
}
