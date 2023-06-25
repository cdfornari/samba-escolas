import { Injectable } from '@nestjs/common';
import { CRUDService } from 'src/common/services/crud.service';
import { QueryService } from 'src/common/services/query.service';
import { Natural } from './entities/naturales.entity';
import { CreateNaturalesInput } from './dto/create-naturales.input';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { UpdateNaturalesInput } from './dto/update-naturales.input';

@Injectable()
export class NaturalesService {
    constructor(
        private readonly queryService: QueryService,
        private readonly crudService: CRUDService,
      ) {}

      private tableName = 'patroc_naturales';

      async create(input: CreateNaturalesInput): Promise<Natural> {
        return this.crudService.create(this.tableName, input);
      }

      async findAll(pagination: PaginationArgs): Promise<Natural[]> {
        return this.crudService.findAll(this.tableName, pagination);
      }

      async count(): Promise<number> {
        return this.queryService.count(this.tableName);
      }
    
      findOne(id: number):  Promise<any> | undefined {
        return this.crudService.findOne(this.tableName, id);
      }
    
      update(input: UpdateNaturalesInput) {
        const { id, ...dto } = input;
        return this.crudService.updateOne(this.tableName, id, dto);
      }
    
      remove(id: number) {
        return this.crudService.remove(this.tableName, id);
      }w
}
