import { Module } from '@nestjs/common';
import { QueryService } from './services/query.service';
import { DateScalar } from './scalars/date.scalar';
import { CRUDService } from './services/crud.service';

@Module({
  providers: [CRUDService, QueryService, DateScalar],
  exports: [CRUDService, QueryService],
})
export class CommonModule {}
