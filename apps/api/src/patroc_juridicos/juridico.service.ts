import { BadRequestException, Injectable } from '@nestjs/common';
import { CRUDService } from 'src/common/services/crud.service';
import { QueryService } from 'src/common/services/query.service';
import { Juridico } from './entities/juridico.entity';
import { CreateJuridicoInput } from './dto/create-juridico.input';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { UpdateJuridicoInput } from './dto/update-juridico.input';

@Injectable()
export class JuridicosService {
  constructor(
    private readonly queryService: QueryService,
    private readonly crudService: CRUDService,
  ) {}

  private tableName = 'patroc_juridicos';

  async create(input: CreateJuridicoInput): Promise<Juridico> {
    return this.crudService.create(this.tableName, input);
  }

  async findAll(pagination: PaginationArgs): Promise<Juridico[]> {
    return this.crudService.findAll(this.tableName, pagination);
  }

  async count(): Promise<number> {
    return this.queryService.count(this.tableName);
  }

  findOne(id: number) {
    return this.crudService.findOne(this.tableName, id);
  }

  update(input: UpdateJuridicoInput) {
    const { id, ...dto } = input;
    return this.crudService.updateOne(this.tableName, id, dto);
  }

  async remove(id: number) {
    const referencedRows = await this.queryService.count(
      'historicos_patrocinios',
      `id_jur = ${id}`,
    );
    if (referencedRows > 0)
      throw new BadRequestException(
        'No se puede eliminar un juridico que tiene historicos de patrocinios',
      );
    await this.queryService.delete('telefonos', `id_jur = ${id}`);
    return this.crudService.delete(this.tableName, { id });
  }
}
