import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { OrgCarnavalesResolver } from './org_carnavales.resolver';
import { OrgCarnavalesService } from './org_carnavales.service';
import { EscolasModule } from 'src/escolas/escolas.module';
import { IntegranteHistoryResolver } from 'src/escolas/integrante-history/integrante-history.resolver';
import { IntegranteHistoryService } from 'src/escolas/integrante-history/integrante-history.service';
import { RolesModule } from 'src/roles/roles.module';
import { RolesResolver } from 'src/roles/roles.resolver';
import { RolesService } from 'src/roles/roles.service';

@Module({
    imports: [CommonModule,EscolasModule,RolesModule],
    providers: [
        OrgCarnavalesResolver,OrgCarnavalesService,
        IntegranteHistoryResolver,IntegranteHistoryService,
        RolesResolver,RolesService
    ]
  })

export class OrgCarnavalesModule {}
