import { BadRequestException, Injectable } from '@nestjs/common';
import { CRUDService } from 'src/common/services/crud.service';
import { QueryService } from 'src/common/services/query.service';
import { CreateDonacionInput} from './dto/create-donacion.input';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { Donacion } from './entities/donacion.entity';
import { UpdateDonacionInput } from './dto/update-donacion.input';
import { DonacionFilterEscuelaArgs } from './types/donacion-filter-escuela.args';
import { DonacionIdArgs } from './types/donacion-id.args';
import { Patrocinio } from '../entities/patrocinio.entity';
import { DonacionFilterHistoricoArgs } from './types/donacion-filter-historico.args';
import { TotalDonacionInput } from './dto/total-donacion.input';

@Injectable()
export class DonacionesService {
  constructor(
    private readonly queryService: QueryService,
    private readonly crudService: CRUDService,
  ) {}

  private tableName = 'donaciones';

  async create(input: CreateDonacionInput) {
    
    const {fecha_inicio,fecha_fin} = (await this.queryService.select<Patrocinio[]>(
      'historicos_patrocinios',
      null,
      `id = ${input.id_patroc}`,
    )
    )[0]

    if ( fecha_fin )
    throw new BadRequestException(
      'Patrocinio cerrado',
    );

      if(new Date(fecha_inicio) > new Date(input.fecha))
      throw new BadRequestException(
        'Fecha no válida, la fecha de la donacion no puede ser menor que la que inició el patrocinio',
      );

    
    return this.crudService.create(this.tableName, input);
  }

  async findAll(
    pagination: PaginationArgs,
    filter: DonacionFilterHistoricoArgs,
  ) {
    return this.queryService.select(
      this.tableName,
      null,
      `id_patroc = ${filter.id_patroc} AND id_escuela = ${filter.id_escuela}`,
      null,
      pagination
    );
  }

  async count(filter?: DonacionFilterHistoricoArgs): Promise<number> {
    return this.queryService.count(
      this.tableName,
      `
      ${filter ? `id_patroc = ${filter.id_patroc} AND id_escuela = ${filter.id_escuela} ` : ''}
    `,
    );
  }

  async findOne(id: number) {
    return this.crudService.findOne(this.tableName, id);
  }

  async update(input: UpdateDonacionInput) {
    const { id, ...dto } = input;

    const {fecha_inicio,fecha_fin} = (await this.queryService.select<Patrocinio[]>(
      'historicos_patrocinios',
      null,
      `id = ${input.id_patroc}`,
    )
    )[0]


    if ( fecha_fin )
      throw new BadRequestException(
        'Patrocinio cerrado',
    );

    if(new Date(fecha_inicio) > new Date(input.fecha))
      throw new BadRequestException(
        'Fecha no válida, la fecha de la donacion no puede ser menor que la que inició el patrocinio',
      );

    return this.crudService.updateOne(this.tableName,id,dto);
  }

  async total(input: TotalDonacionInput) {
    
    const suma = await this.queryService.executeRawQuery(`SELECT SUM(monto) FROM csd_donaciones WHERE id_patroc = ${input.id_patroc} AND id_escuela = ${input.id_escuela}`);

    console.log(suma);

    return suma[0].sum;

  }

  async remove(id: DonacionIdArgs) {
    const {fecha_fin} = (await this.queryService.select<Patrocinio[]>(
      'historicos_patrocinios',
      null,
      `id = ${id.id_patroc}`,
    )
    )[0]

    if ( fecha_fin )
    throw new BadRequestException(
      'Patrocinio cerrado',
    );

    const nose = await this.crudService.delete(this.tableName, id);

      console.log(nose);

    return nose;
  }
}
