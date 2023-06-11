import { Module } from '@nestjs/common';
import { QueryService } from './services/query.service';

@Module({
  providers: [QueryService],
  exports: [QueryService],
})
export class CommonModule {}
