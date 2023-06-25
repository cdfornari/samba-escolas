import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { ColoresService } from './colores.service';
import { ColoresResolver } from './colores.resolver';

@Module({
  imports: [CommonModule],
  providers: [ColoresResolver, ColoresService],
})
export class ColoresModule {
}
