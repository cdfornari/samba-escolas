import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { OrgCarnavalesResolver } from './org_carnavales.resolver';
import { OrgCarnavalesService } from './org_carnavales.service';

@Module({
    imports: [CommonModule],
    providers: [OrgCarnavalesResolver,OrgCarnavalesService]
  })

export class OrgCarnavalesModule {}
