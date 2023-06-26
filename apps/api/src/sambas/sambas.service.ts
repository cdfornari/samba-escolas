import { Injectable } from '@nestjs/common';
import { CreateSambaInput } from './dto/create-samba.input';
import { UpdateSambaInput } from './dto/update-samba.input';
import { QueryService } from 'src/common/services/query.service';
import { CRUDService } from 'src/common/services/crud.service';
import { Samba } from './entities/samba.entity';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';

@Injectable()
export class SambasService {
  constructor(
    private readonly queryService: QueryService,
    private readonly crudService: CRUDService,
  ) {}

  private tableName = 'sambas';

  create(createSambaInput: CreateSambaInput) {
    return this.crudService.create(this.tableName, createSambaInput);
  }

  async findAll(pagination: PaginationArgs): Promise<Samba[]> {
    return this.crudService.findAll(this.tableName, pagination);
  }

  async count(): Promise<number> {
    return this.queryService.count(this.tableName);
  }

  findOne(id: number) {
    return this.crudService.findOne(this.tableName, id);
  }

  update(input: UpdateSambaInput) {
    const { id, ...dto } = input;
    return this.crudService.updateOne(this.tableName, id, dto);
  }

  remove(id: number) {
   
  }
}
