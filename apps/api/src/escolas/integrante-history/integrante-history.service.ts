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
    const history = await this.crudService.create<any, any>(this.tableName, {
      ...input,
      autoridad: input.autoridad ? 'si' : 'no',
    });
    return {
      ...history,
      autoridad: history.autoridad === 'si',
    };
  }

  async findAll(
    filter: HistoricoIntegranteFilterArgs,
    pagination?: PaginationArgs,
  ) {
    return this.crudService.findAll(this.tableName, pagination, filter);
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
    const history = (
      await this.queryService.update<any>(
        this.tableName,
        {
          ...dto,
          autoridad: !!dto.autoridad ? 'si' : 'no',
        },
        `fecha_inicio = '${fecha_inicio}' AND id_escuela = ${id_escuela} AND id_integrante = ${id_integrante}`,
      )
    )[0][0];
    return {
      ...history,
      autoridad: history?.autoridad === 'si',
    };
  }

  async remove(id: HistoricoIntegranteIdArgs) {
    const referencedRows = await Promise.all([
      this.queryService.count(
        'ganadores',
        `id_integrante = ${id.id_integrante} AND id_escuela_integrante = ${id.id_escuela} AND fecha_inicio = '${id.fecha_inicio}'`,
      ),
      this.queryService.count(
        'autores',
        `id_integrante = ${id.id_integrante} AND id_escuela = ${id.id_escuela} AND fecha_inicio = '${id.fecha_inicio}'`,
      ),
      this.queryService.count(
        'org_carnavales',
        `id_integrante = ${id.id_integrante} AND id_escuela = ${id.id_escuela} AND fecha_inicio = '${id.fecha_inicio}'`,
      ),
    ]);
    const total = referencedRows.reduce((acc, curr) => acc + curr, 0);
    if (total > 0)
      throw new BadRequestException(
        'No se puede eliminar el historico porque tiene premios, autoría y/o participaciones asociadas',
      );
    return this.crudService.delete(this.tableName, id);
  }
}
