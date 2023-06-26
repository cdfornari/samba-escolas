import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrgCarnavalInput } from './dto/create-org_canarval.input';
import { QueryService } from 'src/common/services/query.service';
import { CRUDService } from 'src/common/services/crud.service';
import { OrgCarnaval } from './entities/org_carnaval.entity';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { OrgCarnavalFilterEscuelaArgs } from './types/org_carnavales-filter-escuela.args';
import { OrgCarnavalIdArgs } from './types/org_carnavales-id.args';

@Injectable()
export class OrgCarnavalesService {
  constructor(
    private readonly queryService: QueryService,
    private readonly crudService: CRUDService,
  ) {}

  private tableName = 'org_carnavales';

  create(createOrgCarnavalInput: CreateOrgCarnavalInput) {
    return this.crudService.create(this.tableName, createOrgCarnavalInput);
  }

  async findAll(pagination: PaginationArgs,filter:number): Promise<OrgCarnaval[]> {
    return this.crudService.findAll(this.tableName, pagination,{id_escuela:filter});
  }

  async count(filter: number): Promise<number> {
    return this.queryService.count(this.tableName,`id_escuela = ${filter}`);
  }

  async remove(id:OrgCarnavalIdArgs) {
    return this.crudService.delete(this.tableName, id);
  }
}
