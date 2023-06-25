import { Module } from '@nestjs/common';
import { QueryService } from './services/query.service';
import { DateScalar } from './scalars/date.scalar';
import { CRUDService } from './services/crud.service';
import { TelfService } from './services/telf.service';

@Module({
  providers: [CRUDService, QueryService, DateScalar, TelfService],
  exports: [CRUDService, QueryService, TelfService],
})
export class CommonModule {}
