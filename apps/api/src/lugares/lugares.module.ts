import { Module } from '@nestjs/common';
import { LugaresService } from './lugares.service';
import { LugaresResolver } from './lugares.resolver';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [LugaresResolver, LugaresService],
  exports: [LugaresService],
})
export class LugaresModule {}
