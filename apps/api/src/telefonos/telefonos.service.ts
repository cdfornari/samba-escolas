import { Injectable } from '@nestjs/common';
import { CreateTelefonoInput } from './dto/create-telefono.input';
import { UpdateTelefonoInput } from './dto/update-telefono.input';
import { QueryService } from 'src/common/services/query.service';
import { CRUDService } from 'src/common/services/crud.service';
import { Telefono } from './entities/telefono.entity';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { TelfService } from 'src/common/services/telf.service';

@Injectable()
export class TelefonosService {
  constructor(
    private readonly queryService: QueryService,
    private readonly crudService: CRUDService,
    private readonly telfService: TelfService
  ) {}

  private tableName = 'telefonos';

  async create(input: CreateTelefonoInput): Promise<Telefono> {
    return this.crudService.create(this.tableName, input);
  }

  async findAll(pagination: PaginationArgs): Promise<Telefono[]> {
    return this.crudService.findAll(this.tableName, pagination);
  }

  async count(): Promise<number> {
    return this.queryService.count(this.tableName);
  }

  findOne(cod_int: number, cod_area: number, numero: number)   {
    return this.telfService.findOne(this.tableName, cod_int, cod_area, numero);
  }

  update(input: UpdateTelefonoInput)  {
    const {cod_int, cod_area, numero, ...dto } = input;
    return this.telfService.updateOne(this.tableName, cod_int, cod_area, numero, dto)
  }

  remove(cod_int: number, cod_area: number, numero: number) {
    return 'Remove telf';
  }
}
