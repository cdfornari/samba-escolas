import { Injectable } from '@nestjs/common';
import { CreateEscolaInput } from './dto/create-escola.input';
import { UpdateEscolaInput } from './dto/update-escola.input';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { QueryService } from 'src/common/services/query.service';
import { Escola } from './entities/escola.entity';

@Injectable()
export class EscolasService {
  constructor(private readonly queryService: QueryService) {}

  private tableName = 'escuelas_samba';

  async create(input: CreateEscolaInput) {
    let fields = Object.keys(input);
    let values = Object.values(input);
    fields = fields.filter((field) => !!input[field]);
    values = values.filter((value) => !!value);
    return (await this.queryService.insert(this.tableName, fields, values))[0];
  }

  async findAll(pagination: PaginationArgs): Promise<Escola[]> {
    return this.queryService.select<Escola[]>(
      this.tableName,
      null,
      null,
      null,
      pagination,
    );
  }

  async count(): Promise<number> {
    return this.queryService.count(this.tableName);
  }

  async findOne(id: number) {
    return (
      await this.queryService.select(this.tableName, null, `id = ${id}`)
    )[0];
  }

  async update(input: UpdateEscolaInput) {
    const { id, ...dto } = input;
    return (
      await this.queryService.update(this.tableName, dto, `id = ${id}`)
    )[0][0];
  }

  remove(id: number) {
    return `This action removes a #${id} escola`;
  }
}
