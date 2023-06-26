import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTituloHistoryInput } from './dto/create-titulo-history.input';
import { UpdateTituloHistoryInput } from './dto/update-titulo-history.input';
import { QueryService } from 'src/common/services/query.service';
import { CRUDService } from 'src/common/services/crud.service';
import { TituloHistoryIdArgs } from './types/titulo-history-id.args';
import { TituloHistoryFilterArgs } from './types/titulo-history-filter.args';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';

@Injectable()
export class TituloHistoryService {
  constructor(
    private readonly queryService: QueryService,
    private readonly crudService: CRUDService,
  ) {}

  private tableName = 'historicos_titulos';

  async create({ year, id_escuela, ...input }: CreateTituloHistoryInput) {
    if (await this.findOne({ year, id_escuela }))
      throw new BadRequestException('Ya existe ese titulo');
    const result = await this.crudService.create<any, any>(this.tableName, {
      ...input,
      id_escuela,
      anual: `${year}-01-01`,
    });
    return { result, year };
  }

  async findAll(filter: TituloHistoryFilterArgs, pagination?: PaginationArgs) {
    return (
      await this.crudService.findAll<any, TituloHistoryFilterArgs>(
        this.tableName,
        pagination,
        filter,
      )
    ).map((history) => ({
      ...history,
      year: new Date(history.anual).getFullYear(),
    }));
  }

  async findOne(input: TituloHistoryIdArgs) {
    const { id_escuela, year } = input;
    const result = await (
      await this.queryService.select(
        this.tableName,
        null,
        `anual = '${year}-01-01' AND id_escuela = ${id_escuela} }`,
      )
    )[0];
    return {
      ...result,
      year: new Date(result.anual).getFullYear(),
    };
  }

  async count(filter?: TituloHistoryFilterArgs): Promise<number> {
    return this.queryService.count(
      this.tableName,
      `
      ${filter?.id_escuela ? `id_escuela = ${filter.id_escuela}` : ''}
    `,
    );
  }

  async update(input: UpdateTituloHistoryInput) {
    const { year, id_escuela, ...dto } = input;
    const history = (
      await this.queryService.update<any>(
        this.tableName,
        {
          ...dto,
        },
        `anual = '${year}' AND id_escuela = ${id_escuela}`,
      )
    )[0][0];
    return {
      ...history,
    };
  }

  async findEscola(idEscola: number) {
    return (
      await this.queryService.select('escuelas_samba', null, `id = ${idEscola}`)
    )[0];
  }

  remove(id: number) {
    return `This action removes a #${id} tituloHistory`;
  }
}
