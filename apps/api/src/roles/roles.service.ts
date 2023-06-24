import { Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { CRUDService } from 'src/common/services/crud.service';
import { QueryService } from 'src/common/services/query.service';
import { Role } from './entities/role.entity';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';

@Injectable()
export class RolesService {
  constructor(
    private readonly crudService: CRUDService,
    private readonly queryService: QueryService,
  ) {}

  private tableName = 'roles';

  create(createRoleInput: CreateRoleInput) {
    return this.crudService.create(this.tableName, createRoleInput);
  }

  async findAll(pagination: PaginationArgs): Promise<Role[]> {
    return this.crudService.findAll(this.tableName, pagination);
  }

  async count(): Promise<number> {
    return this.queryService.count(this.tableName);
  }

  findOne(id: number) {
    return this.crudService.findOne(this.tableName, id);
  }

  update(input: UpdateRoleInput) {
    const { id, ...dto } = input;
    return this.crudService.updateOne(this.tableName, id, dto);
  }

  remove(id: number) {
    return this.crudService.remove(this.tableName, id);
  }
}
