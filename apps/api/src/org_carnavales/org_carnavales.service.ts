import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrgCarnavalInput } from './dto/create-org_canarval.input';
import { QueryService } from 'src/common/services/query.service';
import { CRUDService } from 'src/common/services/crud.service';
import { OrgCarnaval } from './entities/org_carnaval.entity';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';

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

  async findAll(pagination?: PaginationArgs): Promise<OrgCarnaval[]> {
    return this.crudService.findAll(this.tableName, pagination);
  }

  findOne(id: number) {
    return this.crudService.findOne(this.tableName, id);
  }

  async count(): Promise<number> {
    return this.queryService.count(this.tableName);
  }

  async remove(id: number) {
    const referencedRows = await this.queryService.count(
      'ganadores',
      `id_premio = ${id}`,
    );
    if (referencedRows > 0)
      throw new BadRequestException(
        'No se puede eliminar un premio que tiene ganadores registrados',
      );
    return this.crudService.delete(this.tableName, { id });
  }
}
