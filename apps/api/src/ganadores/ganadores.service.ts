import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGanadoresInput } from './dto/create-ganadores.input';
import { UpdateGanadoresInput } from './dto/update-ganadores.input';
import { QueryService } from 'src/common/services/query.service';
import { CRUDService } from 'src/common/services/crud.service';
import { GanadoresFilterArgs } from './types/ganadores-filter.args';
import { Ganador } from './entities/ganador.entity';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';

@Injectable()
export class GanadoresService {
  constructor(
    private readonly queryService: QueryService,
    private readonly crudService: CRUDService,
  ) {}

  private tableName = 'ganadores';

  async create({ year, ...input }: CreateGanadoresInput) {
    if (await this.findOne(year, input.id_premio))
      throw new BadRequestException(
        'Ya existe un ganador con ese año y premio',
      );
    const result = await this.crudService.create<Ganador, any>(this.tableName, {
      ...input,
      anual: `${year}-01-01`,
    });
    return { ...result, year };
  }

  async findAll(pagination: PaginationArgs, filter: GanadoresFilterArgs) {
    return (
      await this.crudService.findAll<any, any>(this.tableName, pagination, {
        ...(filter.id_escuela && { id_escuela: filter.id_escuela }),
        ...(filter.id_integrante && { id_integrante: filter.id_integrante }),
        ...(filter.fecha_inicio && { fecha_inicio: filter.fecha_inicio }),
        ...(filter.id_escuela_integrante && {
          id_escuela_integrante: filter.id_escuela_integrante,
        }),
      })
    ).map((ganador) => ({
      ...ganador,
      year: new Date(ganador.anual).getFullYear(),
    }));
  }

  async count(filter: GanadoresFilterArgs): Promise<number> {
    return this.queryService.count(
      this.tableName,
      `
      ${filter.id_escuela ? `id_escuela = ${filter.id_escuela}` : ''}
      ${
        !filter.id_escuela
          ? `id_integrante = ${filter.id_integrante} AND fecha_inicio = '${filter.fecha_inicio}' AND id_escuela_integrante = ${filter.id_escuela_integrante}'`
          : ''
      }
    `,
    );
  }

  async findOne(year: number, id_premio: number) {
    return (
      await this.queryService.select(
        this.tableName,
        null,
        `anual = '${year}-01-01' AND id_premio = ${id_premio}`,
      )
    )[0];
  }

  update(input: UpdateGanadoresInput) {}

  remove(year: number, id_premio: number) {
    return this.crudService.delete(this.tableName, {
      anual: `${year}-01-01`,
      id_premio,
    });
  }
}
