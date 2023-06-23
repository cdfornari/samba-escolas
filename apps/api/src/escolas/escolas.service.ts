import { Injectable } from '@nestjs/common';
import { CreateEscolaInput } from './dto/create-escola.input';
import { UpdateEscolaInput } from './dto/update-escola.input';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { QueryService } from 'src/common/services/query.service';
import { Escola } from './entities/escola.entity';

@Injectable()
export class EscolasService {
  constructor(private readonly queryService: QueryService) {}

  async create(createEscolaInput: CreateEscolaInput) {
    let fields = Object.keys(createEscolaInput);
    let values = Object.values(createEscolaInput);
    fields = fields.filter((field) => !!createEscolaInput[field]);
    values = values.filter((value) => !!value);
    return (
      await this.queryService.insert('escuelas_samba', fields, values)
    )[0];
  }

  async findAll(pagination: PaginationArgs): Promise<Escola[]> {
    return this.queryService.select<Escola[]>(
      'escuelas_samba',
      null,
      null,
      null,
      pagination,
    );
  }

  async count(): Promise<number> {
    return this.queryService.count('escuelas_samba');
  }

  findOne(id: number) {
    return `This action returns a #${id} escola`;
  }

  update(id: number, updateEscolaInput: UpdateEscolaInput) {
    return `This action updates a #${id} escola`;
  }

  remove(id: number) {
    return `This action removes a #${id} escola`;
  }
}
