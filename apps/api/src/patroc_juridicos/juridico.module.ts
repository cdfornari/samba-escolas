import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { JuridicosService } from './juridico.service';
import { JuridicosResolver } from './juridico.resolver';
import { LugaresModule } from 'src/lugares/lugares.module';

@Module({
  imports: [CommonModule,LugaresModule],
  providers: [JuridicosResolver, JuridicosService],
})
export class JuridicosModule {
}
