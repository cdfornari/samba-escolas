import { BadRequestException, Injectable } from '@nestjs/common';
import { CRUDService } from 'src/common/services/crud.service';
import { QueryService } from 'src/common/services/query.service';
import { CreateHistoricoIntegranteInput } from './dto/create-integrante-history.input';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { HistoricoIntegrante } from './entities/integrante-history.entity';
import { UpdateHistoricoIntegranteInput } from './dto/update-integrante-history.input';
import { HistoricoIntegranteFilterArgs } from './types/integrante-history-filter.args';
import { HistoricoIntegranteIdArgs } from './types/integrante-history-id.args';

@Injectable()
export class IntegranteHistoryService {
  constructor(
    private readonly queryService: QueryService,
    private readonly crudService: CRUDService,
  ) {}

  private tableName = 'historicos_integrantes';

  async create(input: CreateHistoricoIntegranteInput) {
    if (
      (
        await this.queryService.select<HistoricoIntegrante[]>(
          this.tableName,
          null,
          `id_integrante = ${input.id_integrante} AND fecha_fin IS NULL`,
        )
      ).length > 0
    )
      throw new BadRequestException(
        'El integrante ya tiene un historico activo',
      );
    return this.crudService.create(this.tableName, input);
  }

  async findAll(
    pagination: PaginationArgs,
    filter: HistoricoIntegranteFilterArgs,
  ) {
    return this.crudService.findAll(
      this.tableName,
      pagination,
      filter,
    );
  }

  async count(filter?: HistoricoIntegranteFilterArgs): Promise<number> {
    return this.queryService.count(
      this.tableName,
      `
      ${filter?.id_escuela ? `id_escuela = ${filter.id_escuela}` : ''}
    `,
    );
  }

  async findOne(id: HistoricoIntegranteIdArgs) {
    const { fecha_inicio, id_escuela, id_integrante } = id;
    return (
      await this.queryService.select(
        this.tableName,
        null,
        `fecha_inicio = '${fecha_inicio}' AND id_escuela = ${id_escuela} AND id_integrante = ${id_integrante}`,
      )
    )[0];
  }

  async update(input: UpdateHistoricoIntegranteInput) {
    const { fecha_inicio, id_escuela, id_integrante, ...dto } = input;
    return (
      await this.queryService.update(
        this.tableName,
        dto,
        `fecha_inicio = '${fecha_inicio}' AND id_escuela = ${id_escuela} AND id_integrante = ${id_integrante}`,
      )
    )[0][0];
  }

  remove(id: number) {
    return `This action removes a #${id} escola`;
  }
}
