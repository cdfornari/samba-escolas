import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateIntegranteInput } from './dto/create-integrante.input';
import { UpdateIntegranteInput } from './dto/update-integrante.input';
import { QueryService } from 'src/common/services/query.service';
import { Integrante } from './entities/integrante.entity';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { CRUDService } from 'src/common/services/crud.service';
import { Habilidad } from 'src/habilidades/entities/habilidad.entity';

@Injectable()
export class IntegrantesService {
  constructor(
    private readonly queryService: QueryService,
    private readonly crudService: CRUDService,
  ) {}

  private tableName = 'integrantes';

  async create(input: CreateIntegranteInput) {
    const { id_habilidades = [], ...dto } = input;
    const integrante = await this.crudService.create<Integrante, any>(
      this.tableName,
      dto,
    );
    await Promise.all(
      id_habilidades.map((id_habilidad) =>
        this.addHabilidad(integrante.id, id_habilidad),
      ),
    );
    return integrante;
  }

  async findAll(pagination?: PaginationArgs): Promise<Integrante[]> {
    return this.crudService.findAll(this.tableName, pagination);
  }

  async count(): Promise<number> {
    return this.queryService.count(this.tableName);
  }

  findOne(id: number) {
    return this.crudService.findOne(this.tableName, id);
  }

  async update(input: UpdateIntegranteInput) {
    const { id, id_habilidades = [], ...dto } = input;
    if (id_habilidades.length > 0) {
      await this.queryService.executeRawQuery(
        `DELETE FROM csd_integrantes_habilidades WHERE id_integrante = ${id}`,
      );
      await Promise.all(
        id_habilidades.map((id_habilidad) =>
          this.addHabilidad(id, id_habilidad),
        ),
      );
    }
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

  async getHabilidades(id: number) {
    return this.queryService.executeRawQuery<Habilidad[]>(
      `SELECT * FROM csd_integrantes_habilidades
        JOIN csd_habilidades ON csd_integrantes_habilidades.id_habilidad = csd_habilidades.id
        WHERE id_integrante = ${id}
      `,
    );
  }

  async addHabilidad(id: number, id_habilidad: number) {
    return this.crudService.create('integrantes_habilidades', {
      id_integrante: id,
      id_habilidad,
    });
  }

  async remove(id: number) {
    const referencedRows = await this.queryService.count(
      'historicos_integrantes',
      `id_integrante = ${id}`,
    );
    if (referencedRows > 0)
      throw new BadRequestException(
        `No se puede eliminar el integrante porque tiene ${referencedRows} historico${
          referencedRows > 1 ? 's' : ''
        } asociados`,
      );
    await this.queryService.delete(
      'integrantes_habilidades',
      `id_integrante = ${id}`,
    );
    await this.queryService.delete(
      'integrantes_habilidades',
      `id_integrante_1 = ${id} OR id_integrante_2 = ${id}`,
    );
    return this.crudService.delete(this.tableName, { id });
  }
}
