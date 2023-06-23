import { Module } from '@nestjs/common';
import { IntegrantesService } from './integrantes.service';
import { IntegrantesResolver } from './integrantes.resolver';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [IntegrantesResolver, IntegrantesService]
})
export class IntegrantesModule {}
