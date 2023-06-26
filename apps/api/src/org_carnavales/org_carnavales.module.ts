import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { OrgCarnavalesResolver } from './org_carnavales.resolver';
import { OrgCarnavalesService } from './org_carnavales.service';
import { RolesModule } from 'src/roles/roles.module';
import { IntegrantesModule } from 'src/integrantes/integrantes.module';

@Module({
    imports: [CommonModule,IntegrantesModule,RolesModule],
    providers: [
        OrgCarnavalesResolver,OrgCarnavalesService,
    ]
  })

export class OrgCarnavalesModule {}
