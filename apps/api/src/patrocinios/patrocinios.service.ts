import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePatrocinioInput } from './dto/create-patrocinio.input';
import { UpdatePatrocinioInput } from './dto/update-patrocinio.input';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { QueryService } from 'src/common/services/query.service';
import { CRUDService } from 'src/common/services/crud.service';
import { Patrocinio } from './entities/patrocinio.entity';
import { PatrocinioFilterArgs } from './types/patrocinio-filter.args';
import { PatrocinioIdArgs } from './types/patrocinio-id.args';

@Injectable()
export class PatrociniosService {
  constructor(
    private readonly queryService: QueryService,
    private readonly crudService: CRUDService,
  ) {}

  private tableName = 'historicos_patrocinios';

  async create(input: CreatePatrocinioInput) {
    if (
      (
        await this.queryService.select<Patrocinio[]>(
          this.tableName,
          null,
          input.id_jur? `id_escuela = ${input.id_escuela} AND fecha_fin IS NULL AND id_jur = ${input.id_jur} `
          : `id_escuela = ${input.id_escuela} AND fecha_fin IS NULL AND id_nat = ${input.id_nat} `
          )
      ).length > 0
    )
      throw new BadRequestException(
        'La escuela ya tiene un patrocinio activo',
      );

    return this.crudService.create(this.tableName,input);
  }

  async findAll(
    pagination: PaginationArgs,
    filter: PatrocinioFilterArgs
    ): Promise<Patrocinio[]> {
    return this.crudService.findAll(
      this.tableName,
      pagination,
      filter
    );
  }

  async count(filter?: PatrocinioFilterArgs): Promise<number> {
    return this.queryService.count(
      this.tableName,
      `
      ${filter?.id_escuela ? `id_escuela = ${filter.id_escuela}` : ''}
    `,
    );
  }

  async findOne(id: number) {
    return this.crudService.findOne(this.tableName,id);
  }

  async update(input: UpdatePatrocinioInput) {
    const { id, ...dto } = input;
    if (
      (
        await this.queryService.select<Patrocinio[]>(
          this.tableName,
          null,
          `id = ${input.id} AND fecha_fin IS NOT NULL`,
        )
      ).length > 0
    )
      throw new BadRequestException(
        'Ya se ha cerrado este histórico',
      );
    return (
      await this.queryService.update(
        this.tableName,
        dto,
        `id = ${id}`,
      )
    )[0][0]
  }

  async remove(id: PatrocinioIdArgs) {
    const referencedRows = await this.queryService.count(
      'donaciones',
      `id_patroc = id`,
    )

      console.log(referencedRows)

    if (referencedRows>0) throw new BadRequestException(
      'No se puede eliminar el historico porque tiene donaciones asociadas',
    );

    return this.crudService.delete(this.tableName, id);
}
}
