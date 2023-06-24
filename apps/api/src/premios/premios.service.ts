import { Injectable } from '@nestjs/common';
import { CreatePremioInput } from './dto/create-premio.input';
import { UpdatePremioInput } from './dto/update-premio.input';
import { QueryService } from 'src/common/services/query.service';
import { CRUDService } from 'src/common/services/crud.service';
import { Premio } from './entities/premio.entity';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';

@Injectable()
export class PremiosService {
  constructor(
    private readonly queryService: QueryService,
    private readonly crudService: CRUDService,
  ) {}

  private tableName = 'premios_especiales';

  create(createPremioInput: CreatePremioInput) {
    return this.crudService.create(this.tableName, createPremioInput);
  }

  async findAll(pagination: PaginationArgs): Promise<Premio[]> {
    return this.crudService.findAll(this.tableName, pagination);
  }

  findOne(id: number) {
    return this.crudService.findOne(this.tableName, id);
  }

  update(input: UpdatePremioInput) {
    const { id, ...dto } = input;
    return this.crudService.updateOne(this.tableName, id, dto);
  }

  async count(): Promise<number> {
    return this.queryService.count(this.tableName);
  }

  remove(id: number) {
    return `This action removes a #${id} premio`;
  }
}
