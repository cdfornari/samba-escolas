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
import { IntegrantesModule } from 'src/integrantes/integrantes.module';
import { IntegrantesResolver } from 'src/integrantes/integrantes.resolver';
import { IntegrantesService } from 'src/integrantes/integrantes.service';
import { EscolasResolver } from 'src/escolas/escolas.resolver';
import { EscolasService } from 'src/escolas/escolas.service';

@Module({
    imports: [CommonModule,EscolasModule,IntegrantesModule,RolesModule],
    providers: [
        OrgCarnavalesResolver,OrgCarnavalesService,
        IntegranteHistoryResolver,IntegranteHistoryService,
        RolesResolver,RolesService,
        IntegrantesResolver,IntegrantesService,
        EscolasResolver,EscolasService
    ]
  })

export class OrgCarnavalesModule {}
