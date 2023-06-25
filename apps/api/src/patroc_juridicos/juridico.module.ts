import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { JuridicosService } from './juridico.service';
import { JuridicosResolver } from './juridico.resolver';

@Module({
  imports: [CommonModule],
  providers: [JuridicosResolver, JuridicosService],
})
export class JuridicosModule {
}
