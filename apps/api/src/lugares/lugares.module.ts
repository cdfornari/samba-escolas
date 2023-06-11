import { Module } from '@nestjs/common';
import { LugaresService } from './lugares.service';
import { LugaresResolver } from './lugares.resolver';

@Module({
  providers: [LugaresResolver, LugaresService]
})
export class LugaresModule {}
