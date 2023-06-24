import { Injectable } from '@nestjs/common';
import { CRUDService } from 'src/common/services/crud.service';
import { QueryService } from 'src/common/services/query.service';
import { Habilidad } from './entities/habilidad.entity';
import { CreateHabilidadInput } from './dto/create-habilidad.input';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { UpdateHabilidadesInput } from './dto/update-habilidad.input';

@Injectable()
export class HabilidadesService {
    constructor(
        private readonly queryService: QueryService,
        private readonly crudService: CRUDService,
      ) {}

      private tableName = 'habilidades';

      async create(input: CreateHabilidadInput): Promise<Habilidad> {
        return this.crudService.create(this.tableName, input);
      }

      async findAll(pagination: PaginationArgs): Promise<Habilidad[]> {
        return this.crudService.findAll(this.tableName, pagination);
      }

      async count(): Promise<number> {
        return this.queryService.count(this.tableName);
      }
    
      findOne(id: number) {
        return this.crudService.findOne(this.tableName, id);
      }
    
      update(input: UpdateHabilidadesInput) {
        const { id, ...dto } = input;
        return this.crudService.updateOne(this.tableName, id, dto);
      }
    
      remove(id: number) {
        return this.crudService.remove(this.tableName, id);
      }w
}
