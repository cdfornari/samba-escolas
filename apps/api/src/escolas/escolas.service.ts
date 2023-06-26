import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEscolaInput } from './dto/create-escola.input';
import { UpdateEscolaInput } from './dto/update-escola.input';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { QueryService } from 'src/common/services/query.service';
import { CRUDService } from 'src/common/services/crud.service';
import { Escola } from './entities/escola.entity';
import { Color } from 'src/colores/entities/color.entity';

@Injectable()
export class EscolasService {
  constructor(
    private readonly queryService: QueryService,
    private readonly crudService: CRUDService,
  ) {}

  private tableName = 'escuelas_samba';

  async create(input: CreateEscolaInput) {
    const { id_colores = [], ...dto } = input;
    const escola = await this.crudService.create<Escola, any>(
      this.tableName,
      dto,
    );
    await Promise.all(
      id_colores.map((id_color) => this.addColor(escola.id, id_color)),
    );
    return escola;
  }

  async findAll(pagination: PaginationArgs): Promise<Escola[]> {
    return this.crudService.findAll(this.tableName, pagination);
  }

  async count(): Promise<number> {
    return this.queryService.count(this.tableName);
  }

  async findOne(id: number) {
    return this.crudService.findOne(this.tableName, id);
  }

  async update(input: UpdateEscolaInput) {
    const { id, id_colores = [], ...dto } = input;
    if (id_colores.length > 0) {
      await this.queryService.executeRawQuery(
        `DELETE FROM csd_escuelas_colores WHERE id_escuela = ${id}`,
      );
      await Promise.all(
        id_colores.map((id_color) => this.addColor(id, id_color)),
      );
    }
    return this.crudService.updateOne(this.tableName, id, dto);
  }

  async remove(id: number) {
    const referencedRows = await this.queryService.count(
      'historicos_integrantes',
      `id_escuela = ${id}`,
    );
    if (referencedRows > 0)
      throw new BadRequestException(
        `No se puede eliminar la escuela porque está tiene ${referencedRows} integrante${
          referencedRows > 1 ? 's' : ''
        }`,
      );
    await this.queryService.delete('donaciones', `id_escuela = ${id}`);
    await Promise.all([
      this.queryService.delete('escuelas_colores', `id_escuela = ${id}`),
      this.queryService.delete('historicos_titulos', `id_escuela = ${id}`),
      this.queryService.delete('telefonos', `id_escuela = ${id}`),
      this.queryService.delete('historicos_patrocinios', `id_escuela = ${id}`),
      this.queryService.delete('eventos_anuales_sems', `id_escuela = ${id}`),
      this.queryService.delete('ganadores', `id_escuela = ${id}`),
    ]);
    return this.crudService.delete(this.tableName, { id });
  }

  async getColors(id: number) {
    return this.queryService.executeRawQuery<Color[]>(
      `SELECT * FROM csd_escuelas_colores
        JOIN csd_colores ON csd_escuelas_colores.id_color = csd_colores.id
        WHERE id_escuela = ${id}
      `,
    );
  }

  async addColor(id: number, id_color: number) {
    return this.crudService.create('escuelas_colores', {
      id_escuela: id,
      id_color,
    });
  }
}
