import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [RolesResolver, RolesService],
  exports: [RolesService],
})
export class RolesModule {}
