import { Injectable } from '@nestjs/common';
import { CreateEscolaInput } from './dto/create-escola.input';
import { UpdateEscolaInput } from './dto/update-escola.input';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { QueryService } from 'src/common/services/query.service';
import { CRUDService } from 'src/common/services/crud.service';
import { Escola } from './entities/escola.entity';

@Injectable()
export class EscolasService {
  constructor(
    private readonly queryService: QueryService,
    private readonly crudService: CRUDService,
  ) {}

  private tableName = 'escuelas_samba';

  async create(input: CreateEscolaInput) {
    return this.crudService.create(this.tableName, input);
  }

  async findAll(pagination: PaginationArgs): Promise<Escola[]> {
    return this.crudService.findAll(this.tableName, pagination);
  }

  async count(): Promise<number> {
    return this.queryService.count(this.tableName);
  }

  async findOne(id: number) {
    return this.crudService.findOne(this.tableName, id);
  }

  async update(input: UpdateEscolaInput) {
    const { id, ...dto } = input;
    return this.crudService.updateOne(this.tableName, id, dto);
  }

  remove(id: number) {
    return `This action removes a #${id} escola`;
  }

  async addColor(id: number, id_color: number) {
    return this.crudService.create('escuelas_colores', {
      id_escuela: id,
      id_color,
    });
  }
}
