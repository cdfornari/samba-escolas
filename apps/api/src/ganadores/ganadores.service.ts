import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGanadoresInput } from './dto/create-ganadores.input';
import { UpdateGanadoresInput } from './dto/update-ganadores.input';
import { QueryService } from 'src/common/services/query.service';
import { CRUDService } from 'src/common/services/crud.service';
import { GanadoresFilterArgs } from './types/ganadores-filter.args';
import { Ganador } from './entities/ganador.entity';

@Injectable()
export class GanadoresService {
  constructor(
    private readonly queryService: QueryService,
    private readonly crudService: CRUDService,
  ) {}

  private tableName = 'ganadores';

  async create(input: CreateGanadoresInput) {
    if (await this.findOne(input.year, input.id_premio))
      throw new BadRequestException(
        'Ya existe un ganador con ese año y premio',
      );
    const result = await this.crudService.create<Ganador, CreateGanadoresInput>(
      this.tableName,
      input,
    );
    return { ...result, year: input.year };
  }

  async findAll(filter: GanadoresFilterArgs) {
    return (
      await this.crudService.findAll<any, any>(this.tableName, null, {
        ...(filter.id_escuela && { id_escuela: filter.id_escuela }),
        ...(filter.id_integrante && { id_integrante: filter.id_integrante }),
        ...(filter.fecha_inicio && { fecha_inicio: filter.fecha_inicio }),
      })
    ).map((ganador) => ({
      ...ganador,
      year: new Date(ganador.anual).getFullYear(),
    }));
  }

  async findOne(year: number, id_premio: number) {
    return (
      await this.queryService.select(
        this.tableName,
        null,
        `year = ${year} AND id_premio = ${id_premio}`,
      )
    )[0];
  }

  update(input: UpdateGanadoresInput) {}

  remove(id: number) {
    return `This action removes a #${id} ganadore`;
  }
}
