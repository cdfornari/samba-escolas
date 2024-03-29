import { BadRequestException, Injectable } from '@nestjs/common';
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

  async findAll(pagination?: PaginationArgs): Promise<Premio[]> {
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
