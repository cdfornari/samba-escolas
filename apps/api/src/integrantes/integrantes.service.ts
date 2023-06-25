import { Injectable } from '@nestjs/common';
import { CreateIntegranteInput } from './dto/create-integrante.input';
import { UpdateIntegranteInput } from './dto/update-integrante.input';
import { QueryService } from 'src/common/services/query.service';
import { Integrante } from './entities/integrante.entity';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { CRUDService } from 'src/common/services/crud.service';

@Injectable()
export class IntegrantesService {
  constructor(
    private readonly queryService: QueryService,
    private readonly crudService: CRUDService,
  ) {}

  private tableName = 'integrantes';

  create(input: CreateIntegranteInput) {
    return this.crudService.create(this.tableName, input);
  }

  async findAll(pagination: PaginationArgs): Promise<Integrante[]> {
    return this.crudService.findAll(this.tableName, pagination);
  }

  async count(): Promise<number> {
    return this.queryService.count(this.tableName);
  }

  findOne(id: number) {
    return this.crudService.findOne(this.tableName, id);
  }

  update(input: UpdateIntegranteInput) {
    const { id, ...dto } = input;
    return this.crudService.updateOne(this.tableName, id, dto);
  }

  async getIntegrantesElegibles() {
    const integrantesInactivos = await this.queryService.executeRawQuery<
      Integrante[]
    >(
      `SELECT
        *
      FROM
        csd_integrantes
        JOIN (
          SELECT id_integrante, MAX(fecha_inicio) as max_date
          FROM csd_historicos_integrantes
          GROUP BY id_integrante
        ) max_date ON id = max_date.id_integrante
        JOIN csd_historicos_integrantes h 
          ON h.id_integrante = id 
            AND h.fecha_inicio = max_date 
            AND not(h.fecha_fin ISNULL)
      `,
    );
    const integrantesSinHistorico = await this.queryService.executeRawQuery<
      Integrante[]
    >(
      `SELECT * FROM csd_integrantes
        LEFT JOIN csd_historicos_integrantes h ON id = h.id_integrante
        WHERE h ISNULL
      `,
    );
    return integrantesSinHistorico.concat(integrantesInactivos);
  }

  remove(id: number) {
    return `This action removes a #${id} integrante`;
  }
}
