import { Module } from '@nestjs/common';
import { QueryService } from './services/query.service';
import { DateScalar } from './scalars/date.scalar';

@Module({
  providers: [QueryService, DateScalar],
  exports: [QueryService],
})
export class CommonModule {}
